'use client';
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn,signOut,useSession,getProviders } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@material-tailwind/react'
type Props = {}

export function GoogleSignInButton({}: Props) {
    const { data: session } = useSession()
    const router = useRouter()
    const handleClick = () => {
        signIn('google')
    }
   
  return (
    <Button
    onClick={handleClick}
    size="lg"
    variant="outlined"
    color="blue-gray"
    className="flex items-center gap-3"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
<img
src="https://docs.material-tailwind.com/icons/google.svg"
alt="metamask"
className="h-6 w-6"
/>
Continue with Google
</Button>
  )
}
export function GithubSignInButton({}:Props){

const { data: session } = useSession()
    const router = useRouter()
    const handleClick = () => {
        signIn('github')
    }
   
  return (
    <Button
    onClick={handleClick}
    size="lg"
    variant="outlined"
    color="blue-gray"
    className="flex items-center gap-3"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
<img
src="https://docs.material-tailwind.com/icons/google.svg"
alt="metamask"
className="h-6 w-6"
/>
Continue with GitHub
</Button>
  )
    


}
