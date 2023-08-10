import React, { createContext, useEffect, useState } from 'react'
import { getUserPosts } from '../utils/firebase/firebase-config'

export const UserPostsContext = createContext({ userPosts: null, setUserPosts: () => {} })

function UserPostsProvider({ children }) {
  const [userPosts, setUserPosts] = useState(null)

  useEffect(() => {
    setUserPosts(getUserPosts)
  }, [])

  const value = {
    userPosts,
    setUserPosts,
  }

  return <UserPostsContext.Provider value={value}>{children}</UserPostsContext.Provider>
}

export default UserPostsProvider
