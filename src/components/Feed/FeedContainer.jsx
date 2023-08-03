import React from 'react'

function FeedContainer({ children }) {
  return (
    <div className='flex w-full'>
      <div className='w-2/5 mx-auto'>{children}</div>
    </div>
  )
}

export default FeedContainer
