import React, { useContext, useEffect } from 'react'
import PostContainer from '../Posts/PostContainer'
import PostInfoContainer from '../Posts/PostInfoContainer'
import ProfilePicBubble from '../Profile/ProfilePicBubble'
import PostInfo from '../Posts/PostInfo'
import PostContent from '../Posts/PostContent'
import FeedContainer from './FeedContainer'
import CreatePost from '../CreatePost/CreatePost'
import LoadingSpinner from '../LoadingSpinner'

import { UserPostsContext } from '../../contexts/UserPosts'
import { FeedContext } from '../../contexts/FeedContext'
import { MenuContext } from '../../contexts/MenuContext'

function Feed() {
  const { userPosts } = useContext(UserPostsContext)
  const { isLoading, setIsLoading } = useContext(FeedContext)
  const { setIsOpen } = useContext(MenuContext)

  useEffect(() => {
    setIsLoading(true)
    setIsOpen(false)
  }, [])

  return (
    <FeedContainer>
      <CreatePost />
      {userPosts ? (
        userPosts.map((post) => {
          return (
            <PostContainer key={post.postId} isLoading={isLoading}>
              <PostInfoContainer>
                <ProfilePicBubble profilePic={post.profilePic} addedClasses='mx-5 h-8 w-8' />
                <PostInfo post={post} />
              </PostInfoContainer>
              <PostContent content={post.content} />
            </PostContainer>
          )
        })
      ) : (
        <LoadingSpinner />
      )}
    </FeedContainer>
  )
}

export default Feed
