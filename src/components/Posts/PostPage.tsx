import { Fragment, useEffect, useState, useContext } from 'react'

import { useParams, useNavigate } from 'react-router-dom'

import { MdArrowBack } from 'react-icons/md'

import { UserPostsContext } from '../../contexts/UserPosts'
import { UserContext } from '../../contexts/User'

import Post from './Post'
import LoadingSpinner from '../LoadingSpinner'
import CreatePost from '../CreatePost/CreatePost'
import FeedContainer from '../Feed/FeedContainer'

const PostPage = () => {
  const [pagePost, setPagePost] = useState(null)

  const { userPosts } = useContext(UserPostsContext)
  const { currentAuthUser } = useContext(UserContext)

  const { postId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setPagePost(null)
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
          <div className='text-2xl py-3 border-l border-r  border-slate-700'>
            <MdArrowBack onClick={goBack} className='inline mx-5 -mt-1 hover:cursor-pointer' />
            <span>
              <b>Post</b>
            </span>
          </div>
          <Post post={pagePost} postPage={false} />
          {currentAuthUser && <CreatePost isReply={true} />}
          {pagePost.replies &&
            pagePost.replies.map((replyId: string) => {
              const foundPost = userPosts.find((post) => {
                return post.postId == replyId
              })
              return <Post post={foundPost} postPage={true} />
            })}
        </Fragment>
      ) : (
        <LoadingSpinner />
      )}
    </FeedContainer>
  )
}

export default PostPage
