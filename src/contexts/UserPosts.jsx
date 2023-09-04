import React, { createContext, useState } from 'react'
import { createUserPost } from '../utils/firebase/firebase-config'

export const UserPostsContext = createContext({
  userPosts: null,
  setUserPosts: () => {},
  postCreated: false,
  setPostCreated: () => {},
  createNewUserPost: () => {},
})

function UserPostsProvider({ children }) {
  const [userPosts, setUserPosts] = useState(null)

  const createNewUserPost = async (currentUser, postData) => {
    try {
      await createUserPost(currentUser, postData)
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
