
import React from 'react'
import { Button, Input } from '@nextui-org/react'

import Link from 'next/link'

function Form({type,post,setPost,handleSubmit,submitting}) {
  return (
    <section className='w-full flex-col flex flex-center'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>
        {type} Post
        </span>
       
        </h1>
        <p className='desc text-left max-w-md'>
{type} and share your prompt with the world. and find new prompts.
        </p>
        <form className='flex mt-10 w-full max-w-2xl glassmorphism flex-col gap-7' onSubmit={handleSubmit}>
          <label className='flex flex-col'>
            <span className='text-left text-base text-gray-500 font-satoshi font-semibold'>Your AI prompt</span>
            <textarea className='form_textarea' placeholder='write your prompt' required value={post.prompt} onChange={(e)=>setPost({...post,prompt:e.target.value})}></textarea>
            </label>
            <label className='flex flex-col'>
            <span className='text-left text-base text-gray-700 font-satoshi font-semibold'>{type} tags<span>
              </span>#product #main</span>
            <Input type='text' placeholder='write tags' required value={post.tags} onChange={(e)=>setPost({...post,tags:e.target.value})}></Input>
            </label>
            <div className='flex-end mx-3 mb-5 gap-3'>
              <Link href='/' className='text-gray-500'>
                Cancel
              </Link>
            <Button type='submit' color='primary' isLoading={submitting}>{submitting ? 'Submitting...' : `${type}`}</Button>
            </div>
            </form>
      </section>
  )
}

export default Form