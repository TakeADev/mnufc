import React, { createContext, useState } from 'react'

export const UserContext = createContext({ currentUser: true, setCurrentUser: () => {} })

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(false)

  const value = {
    currentUser,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider
