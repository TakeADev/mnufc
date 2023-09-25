import React from 'react'
import LoadingSpinner from '../LoadingSpinner'

function PostContainer({ children, isLoading, addedClasses }) {
  return (
    <>
      <div className='hidden'>{children}</div>
      <div id='post-holder' className={addedClasses}>
        {isLoading ? <LoadingSpinner addedClasses='my-10' /> : children}
      </div>
    </>
  )
}

export default PostContainer
