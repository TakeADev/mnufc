import React from 'react'

function Button({ addedClasses, onClick, children }) {
  return (
    <button className={`text-black bg-cyan-300 rounded-full ` + addedClasses} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
