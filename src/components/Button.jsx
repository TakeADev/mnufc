import React from 'react'

function Button({ label }) {
  return (
    <button className='text-black text-3xl bg-teal-300 rounded-full w-2/5 py-2 px-3 mr-10'>
      {label}
    </button>
  )
}

export default Button
