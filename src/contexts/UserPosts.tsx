import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { createUserPost } from '../utils/firebase/firebase-config'

import firebase from 'firebase/compat/app'

interface IUserPost {
  content: String
  displayName: String
  likes: number
  postId: String
  replies: Array<IUserPost> | null
  replyTo: String | false
  timestamp: Date
  uid: String
  username: String
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
