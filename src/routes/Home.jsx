import React from 'react'

const posts = [
  { user: 'Dave', content: "Wow I can't believe the goal!!!" },
  { user: 'Dave', content: "Wow I can't believe the goal!!!" },
  { user: 'Dave', content: "Wow I can't believe the goal!!!" },
  { user: 'Dave', content: "Wow I can't believe the goal!!!" },
  { user: 'Dave', content: "Wow I can't believe the goal!!!" },
  { user: 'Dave', content: "Wow I can't believe the goal!!!" },
]

function Home() {
  return (
    <div className='flex w-full'>
      <div className='w-3/4 mx-auto bg-gray-800'>
        {posts.map(({ user, content }) => {
          return <div className='flex w-full h-10'>{user}</div>
        })}
      </div>
    </div>
  )
}

export default Home
