'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Profile from '@components/Profile'

export default function profile() {
  const [post , setPost] = React.useState([])
  const router = useRouter()
  const { data: session } = useSession()
  
  const handleEdit = () => {}
  const handleDelete = () => {}
  return (
    <Profile
    name='my profile'
    desc='this is my profile page'
    data={[]}
    handleEdit={handleEdit}
    handleDelete={handleDelete}

    
    />
  )
}