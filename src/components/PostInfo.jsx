import React from 'react'

function PostInfo({ post }) {
  const { name, handle, time } = post
  return (
    <div className='w-max mt-5 max-h-10 mb-0'>
      <span className=''>
        <b>{name}</b>
      </span>
      <span className='ml-3 text-gray-500'>{handle}</span>
      <span className='ml-3 text-gray-500'>{time}</span>
    </div>
  )
}

export default PostInfo
