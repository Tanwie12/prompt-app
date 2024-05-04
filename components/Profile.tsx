import React from 'react'

type Props = {
    name: string;
  desc: string;
  data: any[];
  error: any;
  handleEdit: () => void;
  handleDelete: () => void;
  loading:boolean;
}

function Profile({name, desc, data, handleEdit, handleDelete }: Props) {
  return (
    <div className='flex flex-col w-full items-center h-full'>
      <h1>{`welcome ${name}`}</h1>

    </div>
  )
}

export default Profile