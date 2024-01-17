import { useContext, useEffect, useState } from 'react'
import FeedContainer from './FeedContainer'
import CreatePost from '../CreatePost/CreatePost'
import LoadingSpinner from '../LoadingSpinner'

import { IUserPost, UserPostsContext } from '../../contexts/UserPosts'
import { FeedContext } from '../../contexts/FeedContext'
import { MenuContext } from '../../contexts/MenuContext'
import Post from '../Posts/Post'
import { TweetContext } from '../../contexts/TweetsContext'
import Tweet from '../Tweets/Tweet'

function Feed() {
  const [postAmount, setPostAmount] = useState<number>(10)
  const [allPosts, setAllPosts] = useState([])

  const { userPosts } = useContext(UserPostsContext)
  const { tweets } = useContext(TweetContext)
  const { setIsLoading } = useContext(FeedContext)
  const { setIsOpen } = useContext(MenuContext)

  useEffect(() => {
    if (tweets && userPosts) {
      const newTweets = tweets.map((tweet) => {
        return { ...tweet, tweet: true }
      })
      const posts = newTweets.concat(userPosts)
      const postsSorted = posts.sort((a, b) => {
        return parseInt(a.timestamp) - parseInt(b.timestamp)
      })
      setAllPosts(postsSorted.reverse())
    }
  }, [tweets, userPosts])

  //When user scrolls to bottom of page, adds 10 to amount of posts being shown
  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight

    if (bottom) {
      setPostAmount(postAmount + 10)
    }
  }

  //State is set to loading, menu is set to closed on initial render
  useEffect(() => {
    setIsLoading(true)
    setIsOpen(false)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })
  })

  return (
    <FeedContainer>
      <CreatePost isReply={false} />

      {allPosts ? (
        allPosts.map((post) => {
          if (post.tweet) {
            return <Tweet tweet={post} />
          }
          return <Post post={post} />
        })
      ) : (
        <LoadingSpinner />
      )}
    </FeedContainer>
  )
}

export default Feed
