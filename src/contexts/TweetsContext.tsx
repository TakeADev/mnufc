import { Dispatch, SetStateAction, createContext, useState } from 'react'

export interface ITweet {
  postId: string
  attachedPhotos: Array<string>
  content: string
  link: string
  timestamp: string
  videoThumbnail: string | null
}

interface ITweetContext {
  tweets: Array<ITweet>
  setTweets: Dispatch<SetStateAction<Array<ITweet>>>
}

export const TweetContext = createContext<ITweetContext>({ tweets: [], setTweets: () => { } })

function TweetsProvider({ children }) {
  const [tweets, setTweets] = useState([])

  const value = {
    tweets,
    setTweets,
  }

  return <TweetContext.Provider value={value}>{children}</TweetContext.Provider>
}

export default TweetsProvider
