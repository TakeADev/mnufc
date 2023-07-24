import React from 'react'

function Home() {
  return (
    <>
      <div id='hero' className='w-screen h-screen bg-black flex items-center'>
        <div className='text-white text-7xl w-1/2 mx-auto max-w-xl'>
          Minnesota United Fan Club
          <h2 className='text-white text-4xl my-10'>Swim with the Loons!</h2>
          <button className='text-black text-3xl bg-teal-300 rounded-full w-2/5 py-2 px-3 mr-10'>
            Login
          </button>
          <button className='text-black text-3xl bg-teal-300 rounded-full w-2/5 py-2 px-3'>
            Sign-Up
          </button>
        </div>
        <div className='w-1/2 text-left pl-10 max-w-3xl h-screen mr-0'>
          <img
            className='h-screen rounded-3xl absolute float-right'
            src='https://images.unsplash.com/photo-1627955353583-5ed9f3ff1dc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80'
            alt='Loon-In-Water'
          />
        </div>
      </div>

      <div>Other Content</div>
    </>
  )
}

export default Home
