import { createContext, useState } from 'react'

export const UserContext = createContext({
  currentAuthUser: null,
  setCurrentAuthUser: () => {},
  currentUserDoc: null,
  setCurrentUserDoc: () => {},
})

function UserProvider({ children }) {
  const [currentAuthUser, setCurrentAuthUser] = useState(null)
  const [currentUserDoc, setCurrentUserDoc] = useState(null)

  const value = {
    currentAuthUser,
    setCurrentAuthUser,
    currentUserDoc,
    setCurrentUserDoc,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider
