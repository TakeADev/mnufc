import React from 'react'

function Modal({ children }) {
  return (
    <div className='w-full h-screen bg-gray-900 opacity-50 fixed z-50'>
      <div className='w-1/4 h-20 mx-auto mt-20 bg-white absolute'></div>
      {children}
    </div>
  )
}

export default Modal
