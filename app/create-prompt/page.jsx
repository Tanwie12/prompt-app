'use client'
import React from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'

function page() {
  const [post,setPost]=useState({
    prompt:'',
    tags:[]
  })
  const {data:session}=useSession()
  const [submitting,setSubmitting]=useState(false)
  const router=useRouter()
  const createPrompt=async(e)=>{
    e.preventDefault()
    setSubmitting(true)
    const {prompt,tags}=post
   try {
  const response = await fetch('/api/prompt/new', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt,
      tags,
      userId: session?.user.id  
    })
  })
 
  if (response.ok) {
    router.push('/')
  }
} catch (error) {
  // handle error
  console.error(error) 
  alert('Something on client went wrong')

} finally {
 setSubmitting(false)
}
 
  }

  return (
   <Form
   type='create'
   post={post}
   setPost={setPost}
   submitting={submitting}
   handleSubmit={createPrompt}
   
   
   />
  )
}

export default page
