import React, { createContext, useState } from 'react'

export const UserContext = createContext({ currentAuthUser: null, setCurrentAuthUser: () => {} })

function UserProvider({ children }) {
  const [currentAuthUser, setCurrentAuthUser] = useState(null)

  const value = {
    currentAuthUser,
    setCurrentAuthUser,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider
