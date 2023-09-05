import React, { useContext } from 'react'

import { FeedContext } from '../../contexts/FeedContext'

import PostContainer from './PostContainer'
import PostInfoContainer from './PostInfoContainer'
import PostInfo from './PostInfo'
import ProfilePicBubble from '../Profile/ProfilePicBubble'
import PostContent from './PostContent'

function Post({ post }) {
  const { isLoading } = useContext(FeedContext)
  return (
    <PostContainer isLoading={isLoading}>
      <PostInfoContainer>
        <ProfilePicBubble profilePic={post.profilePic} addedClasses='mx-5 h-8 w-8' />
        <PostInfo post={post} />
      </PostInfoContainer>
      <PostContent content={post.content} />
    </PostContainer>
  )
}

export default Post
