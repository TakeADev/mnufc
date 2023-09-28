import { Fragment, useEffect, useState, useContext } from 'react'

import { useParams, useNavigate } from 'react-router-dom'

import { MdArrowBack } from 'react-icons/md'

import { UserPostsContext } from '../../contexts/UserPosts'

import Post from './Post'
import LoadingSpinner from '../LoadingSpinner'
import CreatePost from '../CreatePost/CreatePost'
import FeedContainer from '../Feed/FeedContainer'

const PostPage = () => {
  const [pagePost, setPagePost] = useState(null)

  const { userPosts } = useContext(UserPostsContext)

  const { postId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setPagePost(null)
    console.log(postId)
    if (userPosts) {
      setPagePost(
        userPosts.find((post) => {
          return post.postId == postId
        })
      )
    }
  }, [postId, userPosts])

  const goBack = () => {
    navigate(-1)
  }

  return (
    <FeedContainer>
      {pagePost ? (
        <Fragment>
          <div className='text-2xl mt-3'>
            <MdArrowBack onClick={goBack} className='inline mx-5 -mt-1 hover:cursor-pointer' />
            <span>Post</span>
          </div>
          <Post post={pagePost} />
          <CreatePost isReply={true} />
          {pagePost.replies &&
            pagePost.replies.map((post) => <Post key={post.postId} post={post} postPage={true} />)}
        </Fragment>
      ) : (
        <LoadingSpinner />
      )}
    </FeedContainer>
  )
}

export default PostPage
