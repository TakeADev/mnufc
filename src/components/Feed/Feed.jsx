import React, { useContext } from 'react'
import PostContainer from '../Posts/PostContainer'
import PostInfoContainer from '../Posts/PostInfoContainer'
import ProfilePicBubble from '../Profile/ProfilePicBubble'
import PostInfo from '../Posts/PostInfo'
import PostContent from '../Posts/PostContent'
import FeedContainer from './FeedContainer'

import { UserPostsContext } from '../../contexts/UserPosts'

function Feed() {
  const { userPosts } = useContext(UserPostsContext)

  return (
    <FeedContainer>
      {userPosts.map((post) => {
        return (
          <PostContainer key={post.postId}>
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
