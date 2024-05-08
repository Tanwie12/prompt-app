'use client'

import React from 'react'
import PromptCard from './PromptCard'
// import { useFetch } from '@hooks/useFetch'
import {useEffect} from'react'
import {  Spin } from 'antd'


function Feed() {
  
  const [searchText, setSearchText] = React.useState('')
  const [posts, setPosts] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

 const fetchPosts = async () => {
  setIsLoading(true);
  try {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPosts(data);
   
    
  } catch (error) {
    console.log(error)
    alert(error)
    
  }finally{
    setIsLoading(false);
  }
  const response = await fetch("/api/prompt");
  const data = await response.json();
  setPosts(data);
  setIsLoading(false);
}
 
 useEffect(() => {
  fetchPosts();
}, []);
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
    {/* <Button className='btn-primary' onClick={()=>{fetchData()}}>Refetch datas</Button> */}
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
      data={posts}
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