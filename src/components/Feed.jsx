import React from 'react'
import PostContainer from './PostContainer'
import PostInfoContainer from './PostInfoContainer'
import ProfilePicBubble from './ProfilePicBubble'
import PostInfo from './PostInfo'
import PostContent from './PostContent'

import { posts } from '../../post-data'
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
