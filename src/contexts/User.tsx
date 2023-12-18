import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { IUserRepost } from './UserPosts'
import { User } from 'firebase/auth'

export interface IUserDoc {
  bio?: string
  birthDate?: Date | ''
  createdAt?: Date
  displayName?: string
  email?: string
  location?: string
  uid?: string
  username?: string
  likedPosts?: Array<String>
  profilePic: string
  reposts?: Array<IUserRepost>
  photos?: Array<string>
}

interface IUserContext {
  currentAuthUser: User
  setCurrentAuthUser: Dispatch<SetStateAction<User>>
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
