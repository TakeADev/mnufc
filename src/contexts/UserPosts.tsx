import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { createUserPost } from '../utils/firebase/firebase-config'

import firebase from 'firebase/compat/app'

export interface IUserPost {
  content: string
  displayName: string
  likes: number
  postId: string
  replies: Array<IUserPost> | null
  replyTo: string | false
  timestamp: Date
  uid: string
  username: string
}

interface IUserPostsContext {
  userPosts: Array<IUserPost> | null
  setUserPosts: Dispatch<SetStateAction<Array<IUserPost>>>
  createNewUserPost: (currentAuthUser: firebase.User, postContent: any, replyTo: any) => void
}

export const UserPostsContext = createContext<IUserPostsContext>({
  userPosts: null,
  setUserPosts: () => {},
  createNewUserPost: () => {},
})

function UserPostsProvider({ children }) {
  const [userPosts, setUserPosts] = useState(null)

  const createNewUserPost = async (currentAuthUser, postContent, replyTo) => {
    try {
      await createUserPost(currentAuthUser, postContent, replyTo)
    } catch (err) {
      console.log(err)
    }
  }

  const value = {
    userPosts,
    setUserPosts,
    createNewUserPost,
  }

  return <UserPostsContext.Provider value={value}>{children}</UserPostsContext.Provider>
}

export default UserPostsProvider
