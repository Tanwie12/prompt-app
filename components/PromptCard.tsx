import React from 'react'
import { useState } from 'react'
import { Button } from 'antd'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

type Props = {
    key?: any,
    post: any,
    handleTagClick?: (tag: string) => void,
    handleDelete: (post: any) => void,
    handleEdit: (post: any) => void,
    isLoading:any,
}

function PromptCard({key,post,handleTagClick,handleDelete,handleEdit,isLoading}: Props) {
  console.log("the post data")
  console.log(post)
 const pathName=usePathname()
const router = useRouter()
const { data: session } = useSession()
    const [copied, setcopied] = useState('')
    const handleProfileClick = () => {
      router.push(`/profile/${post?.creator?._id}`)
    }
    const handleCopy = () => {
      setcopied(post.prompt)
      navigator.clipboard.writeText(post.prompt)
    }
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={post?.creator?.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post?.creator?.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post?.creator?.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {
         session?.user?.id === post?.creator?._id && pathName === '/profile' && (
          <div className=' text-white flex justify-between items-center gap-3'>
            <Button
            
            
              className='font-inter text-sm text-white bg-primary-300 '
              onClick={() => handleEdit && handleEdit(post)}
              >
              Edit
            </Button>
            <Button
            // loading={isLoading} 
            className='font-inter  text-white text-sm bg-red-500 '
            onClick={() => handleDelete && handleDelete(post)}
            >
              Delete
            </Button>
          </div>
        )
      }

     
    </div>
  )
}

export default PromptCard