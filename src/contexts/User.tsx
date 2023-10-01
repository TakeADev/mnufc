import firebase from 'firebase/compat/app'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

interface IUserContext {
  currentAuthUser: firebase.User
  setCurrentAuthUser: Dispatch<SetStateAction<firebase.User>>
  currentUserDoc: Object
  setCurrentUserDoc: Dispatch<SetStateAction<Object>>
}

export const UserContext = createContext<IUserContext>({
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
