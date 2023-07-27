import React from 'react'
import PostContainer from './PostContainer'
import PostInfoContainer from './PostInfoContainer'
import ProfilePicBubble from './ProfilePicBubble'
import PostInfo from './PostInfo'
import PostContent from './PostContent'

import { posts } from '../../post-data'

function Feed() {
  return (
    <div className='flex w-full'>
      <div className='w-2/5 mx-auto'>
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
      </div>
    </div>
  )
}

export default Feed
