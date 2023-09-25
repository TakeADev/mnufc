import { Fragment, useEffect, useState } from 'react'

import { Link, useParams, useNavigate } from 'react-router-dom'

import { getPostByPostId } from '../../utils/firebase/firebase-config'

import { MdArrowBack } from 'react-icons/md'

import Post from './Post'
import LoadingSpinner from '../LoadingSpinner'
import CreatePost from '../CreatePost/CreatePost'
import FeedContainer from '../Feed/FeedContainer'

const PostPage = () => {
  const [pagePost, setPagePost] = useState(null)
  const { postId } = useParams()
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  const getPost = getPostByPostId(postId).then((res) => res)

  useEffect(() => {
    getPost.then((post) => {
      setPagePost(post)
    })
  }, [postId])
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
          {pagePost.replies
            ? pagePost.replies.map((post) => <Post key={post.postId} post={post} postPage={true} />)
            : console.log('nope')}
        </Fragment>
      ) : (
        <LoadingSpinner />
      )}
    </FeedContainer>
  )
}

export default PostPage
