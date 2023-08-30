import React from 'react'

function FeedContainer({ children }) {
  return (
    <div className='flex w-full'>
      <div className='md:w-4/5 mx-auto'>{children}</div>
    </div>
  )
}

export default FeedContainer
