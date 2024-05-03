import React from 'react'

type Props = {
    name: string;
  desc: string;
  data: any[];
  handleEdit: () => void;
  handleDelete: () => void;
}

function Profile({name, desc, data, handleEdit, handleDelete }: Props) {
  return (
    <div>Profile</div> 
  )
}

export default Profile