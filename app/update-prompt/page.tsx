'use client'
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Form from '@components/Form';
import { useFetch } from '@hooks/useFetch';
interface PromptData {
  prompt: string;
  tags: string[]; // Assuming tags is an array of strings
}
function update() {
  const [post, setPost] = useState<PromptData>({
    prompt: '',
    tags: []
  });
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  console.log(promptId);
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // Check if promptId exists before making the API request
  const { data, loading: isLoading, error }:any = useFetch({
    url: promptId ? `/api/prompt/${promptId}` : null, // Pass null if promptId doesn't exist
    method: 'get'
  });

  useEffect(() => {
    if (data) {
      setPost({
        prompt: data.prompt,
        tags: data.tag
      });
    }
  }, [data]);

  const editPrompt = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify(post),
      });
      setSubmitting(false);
      router.push(`/profile`);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      alert("Something went wrong");}
   
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  );
}

export default update;
