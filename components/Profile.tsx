import React from 'react'
import PromptCard from './PromptCard';

type Props = {
    name: string | undefined | null;
  desc: string;
  data: any[];
  error?: any;
  handleEdit: (post:any) => void;
  handleDelete: (post:any) => void;
  isLoading?:boolean|undefined;
}

function Profile({name, desc, data,isLoading, handleEdit, handleDelete }: Props) {
  return (
    <section className='w-full'>
    <h1 className='head_text text-left'>
      <span className='blue_gradient'>{name} Profile</span>
    </h1>
    <p className='desc text-left'>{desc}</p>

    <div className='mt-10 items-center prompt_layout'>
      {data.map((post) => (
        <PromptCard
       isLoading={isLoading}
          key={post._id}
          post={post}
          handleEdit={ handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  </section>
  )
}

export default Profile