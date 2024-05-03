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
  const [submitting,setSubmitting]=useState(false)
  const router=useRouter()
  const createPrompt=async()=>{
    const {prompt,tags}=post
    const response=await fetch('/api/prompt/new',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        prompt,
        tags
      })
    })
    const data=await response.json()
    router.push(`/prompt/${data._id}`)
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
