import React from 'react'

function FeedContainer({ children }) {
  return (
    <div className='flex w-full'>
      <div className='md:w-3/5 max-w-3xl mx-auto'>{children}</div>
    </div>
  )
}

export default FeedContainer
