import { Fragment, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { getPostByPostId } from '../../utils/firebase/firebase-config'

import { MdArrowBack } from 'react-icons/md'

import Post from './Post'
import LoadingSpinner from '../LoadingSpinner'
import CreatePost from '../CreatePost/CreatePost'
import FeedContainer from '../Feed/FeedContainer'

const PostPage = () => {
  const [pagePost, setPagePost] = useState(null)
  const { postId } = useParams()

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
          <div className='text-2xl'>
            <MdArrowBack className='inline mx-5' />
            <span>Post</span>
	      <span>Test</span>
          </div>
          <Post post={pagePost} />
          <CreatePost isReply={true} />
        </Fragment>
      ) : (
        <LoadingSpinner />
      )}
    </FeedContainer>
  )
}

export default PostPage
