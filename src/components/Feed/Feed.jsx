import React, { useContext, useEffect } from 'react'
import FeedContainer from './FeedContainer'
import CreatePost from '../CreatePost/CreatePost'
import LoadingSpinner from '../LoadingSpinner'

import { UserPostsContext } from '../../contexts/UserPosts'
import { FeedContext } from '../../contexts/FeedContext'
import { MenuContext } from '../../contexts/MenuContext'
import Post from '../Posts/Post'
import { getPostByPostId } from '../../utils/firebase/firebase-config'

function Feed() {
  const { userPosts } = useContext(UserPostsContext)
  const { setIsLoading } = useContext(FeedContext)
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
          if (post.replyTo) {
            const replyPost = getPostByPostId(post.replyTo).then((res) => res)
            console.log(replyPost)
            return (
              <div>
                <Post key={post.replyTo.postId} post={post.replyTo} />
                <Post key={post.postId} post={post} />
              </div>
            )
          } else {
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
