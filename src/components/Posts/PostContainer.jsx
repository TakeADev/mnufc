import React from 'react'
import LoadingSpinner from '../LoadingSpinner'

function PostContainer({ children, isLoading }) {
  return (
    <>
      <div className='hidden'>{children}</div>
      <div id='post-holder' className='border border-slate-900'>
        {isLoading ? <LoadingSpinner addedClasses='my-10' /> : children}
      </div>
    </>
  )
}

export default PostContainer
