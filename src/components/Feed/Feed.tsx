import { useContext, useEffect, useState } from 'react'
import FeedContainer from './FeedContainer'
import CreatePost from '../CreatePost/CreatePost'
import LoadingSpinner from '../LoadingSpinner'

import { IUserPost, UserPostsContext } from '../../contexts/UserPosts'
import { FeedContext } from '../../contexts/FeedContext'
import { MenuContext } from '../../contexts/MenuContext'
import Post from '../Posts/Post'

function Feed() {
  const [postAmount, setPostAmount] = useState<number>(10)

  const { userPosts } = useContext(UserPostsContext)
  const { setIsLoading } = useContext(FeedContext)
  const { setIsOpen } = useContext(MenuContext)

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
      {userPosts ? (
        userPosts.map((post: IUserPost, index) => {
          if (index < postAmount) {
            return <Post key={post.postId} post={post} />
          }
        })
      ) : (
        <LoadingSpinner />
      )}
    </FeedContainer>
  )
}

export default Feed
