import { useContext, useState, useEffect } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import { getUserDocFromUsername } from '../../utils/firebase/firebase-config'

import { FeedContext } from '../../contexts/FeedContext'
import { UserPostsContext } from '../../contexts/UserPosts'

import { IUserPost } from '../../contexts/UserPosts'
import { IUserDoc } from '../../contexts/User'

import PostContainer from './PostContainer'
import PostInfoContainer from './PostInfoContainer'
import PostInfo from './PostInfo'
import ProfilePicBubble from '../Profile/ProfilePicBubble'
import PostContent from './PostContent'
import PostInteractionBar from './PostInteractionBar'
import PostMenu from './PostMenu'
import { MdOutlineReply } from 'react-icons/md'

interface PostProps {
  post: IUserPost
  postPage?: boolean
}

function Post({ post, postPage }: PostProps) {
  const [originalPost, setOriginalPost] = useState<IUserPost | null>(null)
  const [originalPostUser, setOriginalPostUser] = useState<IUserDoc | null>(null)
  const [postUserDoc, setPostUserDoc] = useState<IUserDoc | null>(null)

  const { isLoading } = useContext(FeedContext)
  const { userPosts } = useContext(UserPostsContext)

  const navigate = useNavigate()

  const paramId = useParams().postId

  useEffect(() => {
    setOriginalPost(null)

    //Gets user doc from post and stores to state
    getUserDocFromUsername(post.username).then((res: IUserDoc) => setPostUserDoc(res))

    //Gets and sets originalPost from replyTo value
    post.replyTo &&
      setOriginalPost(
        userPosts.find((e) => {
          return e.postId == post.replyTo
        })
      )

    //If there is an original post, gets original post user and stores to state
    originalPost &&
      getUserDocFromUsername(originalPost.username).then((res: IUserDoc) =>
        setOriginalPostUser(res)
      )
  }, [paramId, post, originalPost, userPosts])

  const navigateToProfileOnClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate(`/${post.username}`)
  }

  const navigateToPostOnClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate(`/${originalPost.username}/status/${originalPost.postId}`)
  }

  const navigateToPhotoOnClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate(`/${post.username}/status/${post.postId}/photo`)
  }

  //Displays if post is reply && is not a reply on a posts post page
  if (post.replyTo && !postPage && originalPost && originalPostUser && postUserDoc) {
    return (
      <Link className={''} to={`/${post.username}/status/${post.postId}`}>
        <div className='border-b border-l border-r border-slate-700 pt-2'>
          <div className='w-full pr-2 md:pr-16 relative'>
            <PostMenu post={post} />
            <PostContainer isLoading={isLoading} addedClasses=''>
              <PostInfoContainer>
                <ProfilePicBubble
                  onClick={navigateToProfileOnClick}
                  addedClasses='mx-5 h-8 w-8 mt-2'
                  profilePic={postUserDoc.profilePic}
                />
                <PostInfo post={post} />
              </PostInfoContainer>
              {post.attachedPhoto && (
                <div
                  className='ml-16 text-sm text-gray-500 hover:underline'
                  onClick={navigateToPostOnClick}
                >
                  <MdOutlineReply className='inline text-lg mb-2' />
                  <span>Replying to {originalPost.username}</span>
                </div>
              )}
              <PostContent content={post.content} addedClasses='ml-16' />
              {post.attachedPhoto && (
                <div className='pr-16'>
                  <img
                    src={post.attachedPhoto}
                    className='max-h-[500px] rounded-lg ml-16 mb-5 '
                    onClick={navigateToPhotoOnClick}
                  />
                </div>
              )}
            </PostContainer>
            {!post.attachedPhoto && (
              <div
                onClick={navigateToPostOnClick}
                className='ml-10 mr-0 lg:mr-5 my-5 border border-slate-700 rounded-lg'
              >
                <PostContainer isLoading={isLoading} addedClasses=''>
                  <PostInfoContainer>
                    <ProfilePicBubble
                      onClick={navigateToProfileOnClick}
                      profilePic={originalPostUser.profilePic}
                      addedClasses='mx-5 h-8 w-8 mt-2'
                    />
                    <PostInfo post={originalPost} />
                  </PostInfoContainer>
                  <PostContent content={originalPost.content} addedClasses='ml-16 md:mr-8' />
                </PostContainer>
              </div>
            )}
            <PostInteractionBar post={post} />
          </div>
        </div>
      </Link>
    )
  }

  //Displays if is original post
  if (postUserDoc && post) {
    return (
      <Link className={''} to={`/${post.username}/status/${post.postId}`}>
        <div className='w-full relative'>
          <PostMenu post={post} />
          <PostContainer
            isLoading={isLoading}
            addedClasses='border-b border-l border-r border-slate-700 pr-2 md:pr-16 pt-2 '
          >
            <PostInfoContainer>
              <ProfilePicBubble
                onClick={navigateToProfileOnClick}
                profilePic={postUserDoc.profilePic}
                addedClasses='mx-5 h-8 w-8 mt-2'
              />
              <PostInfo post={post} />
            </PostInfoContainer>
            <PostContent content={post.content} addedClasses='ml-16' />
            {post.attachedPhoto && (
              <div className='pr-16'>
                <img
                  src={post.attachedPhoto}
                  className='max-h-[500px] rounded-lg ml-16 mb-5'
                  onClick={navigateToPhotoOnClick}
                />
              </div>
            )}
            <PostInteractionBar post={post} />
          </PostContainer>
        </div>
      </Link>
    )
  }
}

export default Post
