import React from 'react'

function Button({ type, addedClasses, onClick, children }) {
  return (
    <button type={type} className={`text-black bg-cyan-300 rounded-full ` + addedClasses} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
