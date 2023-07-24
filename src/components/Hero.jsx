import React from 'react'
import Button from './Button'

function Hero() {
  return (
    <div id='hero' className='w-screen h-screen bg-black flex items-center'>
      <div className='mx-auto w-1/2  max-w-xl'>
        <span className='text-white text-7xl'>Minnesota United Fan Club</span>
        <h2 className='text-white text-4xl my-10'>Swim with the Loons!</h2>
        <Button label='Login' />
        <Button label='Sign-Up' />
      </div>
      <div className='w-1/2 text-left pl-10 max-w-3xl h-screen mr-0'>
        <img
          className='h-screen rounded-3xl absolute float-right'
          src='https://images.unsplash.com/photo-1627955353583-5ed9f3ff1dc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80'
          alt='Loon-In-Water'
        />
      </div>
    </div>
  )
}

export default Hero
