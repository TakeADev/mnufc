import React from 'react'

function PostInfo({ post }) {
  const { name, username, timestamp } = post
  return (
    <div className='w-max mt-5 max-h-10 mb-0'>
      <span className=''>
        <b>{name}</b>
      </span>
      <span className='ml-3 text-gray-500'>@{username}</span>
      <span className='ml-3 text-gray-500'>{timestamp}</span>
    </div>
  )
}

export default PostInfo
