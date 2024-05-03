'use client';

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect,useState } from 'react'
import { signIn,signOut,useSession,getProviders } from 'next-auth/react'
import { Button } from '@nextui-org/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";

function Nav() {
  const { data: session } = useSession()
 console.log(session)
     const [providers,setProviders]=useState(null)

useEffect(()=>{
   const setUpproviders=async()=>{
       const response=await getProviders()
       setProviders(response)
   }
    setUpproviders()
},[])

  return (
    <nav className='flex-between items-center w-full pt-4'>
     <Link href='/' className='flex gap-2 flex-center'>
        <Image
        src='/assets/images/logo.svg'
        width={30}
        height={30}
        className='object-contain'
        
        />
        <p className='logo_text'>Promtopia</p>
     </Link>
  
     {/* Desktop navigation */}
     <div className='gap-4 md:gap-4 hidden md:flex'>
     {session?.user ? (
        <>

    <Link href={`/create-prompt`} className='black_btn'>
        Create Post
    </Link>
    <Button type='button' onClick={signOut}> Sign Out</Button>
    <Link href={`/profile`}>
    <Image
    src={session.user.image}
    width={30}
    height={30}
    className='object-contain rounded-full'
    
    />
    </Link>

    

        </>
     ): (
        <>
        {providers && Object.values(providers).map((provider)=>(
            <div key={provider.name}>
                <Button type='button' onClick={()=>signIn(provider.id)}> Sign In with {provider.name}</Button>
            </div>
        ))}


        </>


        
     )}
     </div>
     {/* Mobilenavigation */}
     <div className='md:hidden flex relative'>
      {
         session?.user ?(
         
         <>
          <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      src= {session.user.image}
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">{`mike`}</p>
                    </DropdownItem>
                    <DropdownItem key="profile" href={`/profile`}>My Profile</DropdownItem>
                    <DropdownItem key="profile" href={`/create-prompt`}>create prompt</DropdownItem>
                   
                    <DropdownItem key="logout" color="danger" onPress={signOut}>
                      Sign Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
         
         
         </>):(

            <>
            {providers && Object.values(providers).map((provider)=>(
                <div key={provider.name}>
                    <Button type='button' onClick={()=>signIn(provider.id)}> Sign In with {provider.name}</Button>
                </div>
            ))}
            </>
         )
        
            
      }



     </div>
        
    </nav>
  )
}

export default Nav