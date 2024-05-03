import React from 'react'

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
            </form>
      </section>
  )
}

export default Form