import React from 'react'

function Button({ addedClasses, children }) {
  return (
    <button className={`text-black bg-cyan-300 rounded-full ` + addedClasses}>
      {children}
    </button>
  )
}

export default Button
