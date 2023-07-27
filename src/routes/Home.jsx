import React from 'react'

const placeholderPic =
  'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png'

const posts = [
  {
    id: 0,
    name: 'Dave',
    handle: '@davethedude',
    time: '9:45pm',
    profilePic: placeholderPic,
    content: "Wow I can't believe the goal!!!",
  },
  {
    id: 2,
    name: 'Dave',
    handle: '@davethedude',
    time: '9:45pm',
    profilePic: placeholderPic,
    content: "Wow I can't believe the goal!!!",
  },
  {
    id: 3,
    name: 'Dave',
    handle: '@davethedude',
    time: '9:45pm',
    profilePic: placeholderPic,
    content: "Wow I can't believe the goal!!!",
  },
  {
    id: 4,
    name: 'Dave',
    handle: '@davethedude',
    time: '9:45pm',
    profilePic: placeholderPic,
    content: "Wow I can't believe the goal!!!",
  },
]

function Home() {
  return (
    <div className='flex w-full'>
      <div className='w-1/2 mx-auto'>
        {posts.map(({ id, name, handle, time, content, profilePic }) => {
          return (
            <div id='post-holder' className='border border-slate-900'>
              <div
                id='user-holder'
                key={id}
                className='flex w-full min-h-[75px]'
              >
                <img
                  src={profilePic}
                  alt='pfp'
                  className='rounded-full w-10 m-5 h-10'
                />
                <div className='w-max mt-5 max-h-10 mb-0'>
                  <span className=''>
                    <b>{name}</b>
                  </span>
                  <span className='ml-3 text-gray-500'>{handle}</span>
                  <span className='ml-3 text-gray-500'>{time}</span>
                </div>
              </div>
              <div id='content-container' className='ml-20 mb-5'>
                <span className=''>{content}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
