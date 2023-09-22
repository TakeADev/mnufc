import React from 'react'
import LoadingSpinner from '../LoadingSpinner'

function PostContainer({ children, isLoading }) {
  return (
    <>
      <div className='hidden'>{children}</div>
      <div id='post-holder' className='border-b border-slate-700'>
        {isLoading ? <LoadingSpinner addedClasses='my-10' /> : children}
      </div>
    </>
  )
}

export default PostContainer
