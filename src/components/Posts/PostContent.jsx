import React from 'react'

function PostContent({ content }) {
  return (
    <div id='content-container' className='ml-20 mb-5'>
      <span>{content}</span>
    </div>
  )
}

export default PostContent
