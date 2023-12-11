import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { createUserPost } from '../utils/firebase/firebase-config'

import firebase from 'firebase/compat/app'
import { User } from 'firebase/auth'

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

export interface IUserRepost {
  postId?: string
  timestamp?: Date
}

interface IUserPostsContext {
  userPosts: Array<IUserPost> | null
  setUserPosts: Dispatch<SetStateAction<Array<IUserPost>>>
  createNewUserPost: (currentAuthUser: User, postContent: string, replyTo: false | string) => void
}

export const UserPostsContext = createContext<IUserPostsContext>({
  userPosts: null,
  setUserPosts: () => {},
  createNewUserPost: () => {},
})

function UserPostsProvider({ children }) {
  const [userPosts, setUserPosts] = useState(null)

  const createNewUserPost = async (
    currentAuthUser: firebase.User,
    postContent: string,
    replyTo: string
  ) => {
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
