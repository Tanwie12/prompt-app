'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import Profile from '@components/Profile'

export default function profile() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [post , setPost] = React.useState([])
  const router = useRouter()
  const { data: session } = useSession()
  const fetchData = async () => {
    const res = await fetch(
      `/api/users/${session?.user?.id}/posts`,
    )
    const data = await res.json()
    setPost(data)
  }
 useEffect(() => {
  if (session?.user?.id) {
    fetchData()
  } 
   
  }, [session?.user?.id,])
 
  
  const handleEdit = (post:any) => {
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async(post:any) => {
      setIsLoading(true)


    try {
      await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting prompt:", error);
    }
    finally {
      setIsLoading(false)
    }
    fetchData()
  }
  return (
    <Profile
    name={session?.user?.name}
    desc='this is my profile page'
    data={post}
    isLoading={isLoading}
    handleEdit={handleEdit}
    handleDelete={handleDelete}

    
    />
  )
}