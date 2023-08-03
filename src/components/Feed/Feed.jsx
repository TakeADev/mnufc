import React from 'react'
import PostContainer from '../Posts/PostContainer'
import PostInfoContainer from '../Posts/PostInfoContainer'
import ProfilePicBubble from '../ProfilePicBubble'
import PostInfo from '../Posts/PostInfo'
import PostContent from '../Posts/PostContent'

import { posts } from '../../../post-data'
import FeedContainer from './FeedContainer'

function Feed() {
  return (
    <FeedContainer>
      {posts.map((post) => {
        return (
          <PostContainer key={post.id}>
            <PostInfoContainer>
              <ProfilePicBubble profilePic={post.profilePic} />

              <PostInfo post={post} />
            </PostInfoContainer>

            <PostContent content={post.content} />
          </PostContainer>
        )
      })}
    </FeedContainer>
  )
}

export default Feed
