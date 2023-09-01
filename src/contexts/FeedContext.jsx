import React, { createContext, useState } from 'react'

export const FeedContext = createContext({ isLoading: true, setIsLoading: () => {} })

function FeedProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true)

  const value = {
    isLoading,
    setIsLoading,
  }

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>
}

export default FeedProvider
