import React, { createContext, useState } from 'react'

export const UserContext = createContext({ currentUser: null, setCurrentUser: () => {} })

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  console.log(currentUser)

  const value = {
    currentUser,
    setCurrentUser,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider
