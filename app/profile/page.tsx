'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Profile from '@components/Profile';
import { useFetch } from '@hooks/useFetch';

export default function ProfilePage() {
  const [post, setPost] = React.useState([]);
  const router = useRouter();
  const { data: session } = useSession();
  const { data, error, loading } = useFetch({
    url: '/api/prompt/all',
    method: 'get',
    body: {},
  });

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <Profile
      name="my profile"
      desc="this is my profile page"
      data={data} // Pass fetched data here
      loading={loading} // Pass loading state
      error={error} // Pass error state
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
