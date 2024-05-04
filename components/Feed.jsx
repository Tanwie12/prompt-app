'use client'

import React from 'react'
import PromptCard from './PromptCard'
import { useFetch } from '@hooks/useFetch'
import {useEffect} from'react'
import { Button, Spin } from 'antd'

function Feed() {
  
  const [searchText, setSearchText] = React.useState('')
  const [posts, setPosts] = React.useState([])
 const {data, loading:isLoading, error,fetchData} = useFetch({url: '/api/prompt/all',
 method: 'get',
 })

  const handleChange = (e) => {
    setSearchText(e.target.value)
  }
  const PromptCardList = ({data, handleTagClick}) => {
    return (
      <div className='flex flex-col gap-4'>
       {data.map(post => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
       
      </div>
    )}

      
    
  return (
   <section className='feed'>
    <Button className='btn-primary' onClick={()=>{fetchData()}}>REfect</Button>
    <form className='flex w-full flex-col gap-4'>
     <input type="text" placeholder='Search for a tag or username' className='search_input peer'
     value={searchText}
     onChange={handleChange}
     
     />
    
    </form>
    {isLoading ?(
      <Spin size='large'spinning={isLoading} />
    ) : (
      <PromptCardList
      data={data}
      handleTagClick={() => {
        console.log('Tag clicked!')
      }}
      
      />
    )
    
    
    }
   
   </section>

  )
}

export default Feed