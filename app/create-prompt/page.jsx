'use client'
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';
import { useFetch } from '@hooks/useFetch';

function Page() {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tags: [],
  });
  const { data } = useFetch('/api/prompt/new', 'POST', {
    prompt: post.prompt,
    tags: post.tags,
    userId: session?.user.id,
  });
  const { data: session } = useSession();
  const router = useRouter();

  const createPrompt =  (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      
      setPost(data);
      router.push('/');
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
}

export default Page;
