import React from 'react'

function PostContainer({ children }) {
  return (
    <div id='post-holder' className='border border-slate-900'>
      {children}
    </div>
  )
}

export default PostContainer
