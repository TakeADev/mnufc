import firebase from 'firebase/compat/app'
import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { IUserRepost } from './UserPosts'

export interface IUserDoc {
  bio?: String
  birthDate?: Date | ''
  createdAt?: Date
  displayName?: String
  email?: String
  location?: String
  uid?: String
  username?: String
  likedPosts?: Array<String>
  profilePic: string
  reposts?: Array<IUserRepost>
}

interface IUserContext {
  currentAuthUser: firebase.User
  setCurrentAuthUser: Dispatch<SetStateAction<firebase.User>>
  currentUserDoc: IUserDoc
  setCurrentUserDoc: Dispatch<SetStateAction<IUserDoc>>
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
