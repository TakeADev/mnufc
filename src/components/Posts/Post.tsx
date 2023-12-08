import { useContext, useState, useEffect } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import { FeedContext } from '../../contexts/FeedContext'
import { IUserPost, UserPostsContext } from '../../contexts/UserPosts'

import PostContainer from './PostContainer'
import PostInfoContainer from './PostInfoContainer'
import PostInfo from './PostInfo'
import ProfilePicBubble from '../Profile/ProfilePicBubble'
import PostContent from './PostContent'
import PostInteractionBar from './PostInteractionBar'
import PostMenu from './PostMenu'

interface PostProps {
  post: IUserPost
  postPage?: boolean
}

function Post({ post, postPage }: PostProps) {
  const [originalPost, setOriginalPost] = useState(null)
  const { isLoading } = useContext(FeedContext)
  const { userPosts } = useContext(UserPostsContext)

  const navigate = useNavigate()

  const paramId = useParams().postId

  useEffect(() => {
    setOriginalPost(null)
    if (post.replyTo) {
      setOriginalPost(
        userPosts.find((e) => {
          return e.postId == post.replyTo
        })
      )
    } else return
  }, [paramId, post, userPosts])

  const navigateToProfileOnClick = (e) => {
    e.preventDefault()
    navigate(`/${post.username}`)
  }

  const navigateToPostOnClick = (e) => {
    e.preventDefault()
    navigate(`/${originalPost.username}/status/${originalPost.postId}`)
  }

  if (post.replyTo && !postPage && originalPost) {
    return (
      <Link className={''} to={`/${post.username}/status/${post.postId}`}>
        <div className='border-b border-l border-r border-slate-700 '>
          <div className='w-full pr-16 relative'>
            <PostMenu post={post} />
            <PostContainer isLoading={isLoading}>
              <PostInfoContainer>
                <ProfilePicBubble
                  onClick={navigateToProfileOnClick}
                  addedClasses='mx-5 h-8 w-8 mt-5'
                  profilePicUsername={post.username.toString()}
                />
                <PostInfo post={post} />
              </PostInfoContainer>
              <PostContent content={post.content} addedClasses='ml-16' />
            </PostContainer>
            <div
              onClick={navigateToPostOnClick}
              className='ml-10 mr-0 lg:mr-5 my-5 border border-slate-700 rounded-lg'
            >
              <PostContainer isLoading={isLoading} addedClasses=''>
                <PostInfoContainer>
                  <ProfilePicBubble
                    onClick={navigateToProfileOnClick}
                    profilePic={originalPost.profilePic}
                    addedClasses='mx-5 h-8 w-8 mt-5'
                  />
                  <PostInfo post={originalPost} />
                </PostInfoContainer>
                <PostContent content={originalPost.content} addedClasses='ml-16 mr-8' />
              </PostContainer>
            </div>
            <PostInteractionBar post={post} />
          </div>
        </div>
      </Link>
    )
  }

  return (
    post && (
      <Link className={''} to={`/${post.username}/status/${post.postId}`}>
        <div className='w-full relative'>
          <PostMenu post={post} />
          <PostContainer
            isLoading={isLoading}
            addedClasses='border-b border-l border-r border-slate-700 pr-16'
          >
            <PostInfoContainer>
              <ProfilePicBubble
                onClick={navigateToProfileOnClick}
                profilePic={post.profilePic}
                addedClasses='mx-5 h-8 w-8 mt-5'
                profilePicUsername={post.username.toString()}
              />
              <PostInfo post={post} />
            </PostInfoContainer>
            <PostContent content={post.content} addedClasses='ml-16' />
            <PostInteractionBar post={post} />
          </PostContainer>
        </div>
      </Link>
    )
  )
}

export default Post
