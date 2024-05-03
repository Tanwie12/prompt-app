'use client'

import React from 'react'
import PromptCard from './PromptCard'

import {useEffect} from'react'

function Feed() {
  const [searchText, setSearchText] = React.useState('')
  const [posts, setPosts] = React.useState([])

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
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch('/api/prompt/all');
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await res.json();
          console.log(data);
          setPosts(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);
    
  return (
   <section className='feed'>
    <form className='flex w-full flex-col gap-4'>
     <input type="text" placeholder='Search for a tag or username' className='search_input peer'
     value={searchText}
     onChange={handleChange}
     
     />
    
    </form>
    <PromptCardList
    data={posts}
    handleTagClick={() => {
      console.log('Tag clicked!')
    }}
    
    />
   </section>

  )
}

export default Feed