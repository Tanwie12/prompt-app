import React from 'react'
import { Button } from 'antd';

function Home() {
  return (
    <section className='w-full flex-col flex flex-center'>
      <h1 className='head_text text-center'>
       Discover & Share
      </h1>
      <br className='max-md;hidden'/>
      <span className='orange_gradient text-center'>
AI-Powered Prompts
      </span>
      <p className='desc text-center'>
        promtopia is an AI-powered platform that helps you discover and share prompts.
      </p>

    </section>
  )
}

export default Home