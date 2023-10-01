import { Dispatch, SetStateAction, createContext, useState } from 'react'

interface IFeedContext {
  isLoading: Boolean
  setIsLoading: Dispatch<SetStateAction<Boolean>>
}

export const FeedContext = createContext<IFeedContext>({ isLoading: true, setIsLoading: () => {} })

function FeedProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true)

  const value = {
    isLoading,
    setIsLoading,
  }

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>
}

export default FeedProvider
