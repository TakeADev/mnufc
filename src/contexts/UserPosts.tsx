import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { createUserPost } from '../utils/firebase/firebase-config'

import firebase from 'firebase/compat/app'

interface IUserPostsContext {
  userPosts: Array<Object> | null
  setUserPosts: Dispatch<SetStateAction<Array<Object>>>
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
