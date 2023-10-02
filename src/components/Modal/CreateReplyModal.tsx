import { FunctionComponent, MouseEventHandler, useContext } from 'react'
import { IUserPost } from '../../contexts/UserPosts'

import { FeedContext } from '../../contexts/FeedContext'
import { ModalContext } from '../../contexts/ModalContext'

import PostContainer from '../Posts/PostContainer'
import PostInfoContainer from '../Posts/PostInfoContainer'
import ProfilePicBubble from '../Profile/ProfilePicBubble'
import PostInfo from '../Posts/PostInfo'
import PostContent from '../Posts/PostContent'
import { Link } from 'react-router-dom'
import CreatePost from '../CreatePost/CreatePost'

interface ICreateReplyModalProps {
  post: IUserPost
}

const CreateReplyModal: FunctionComponent<ICreateReplyModalProps> = ({ post }) => {
  const { isLoading } = useContext(FeedContext)
  const { setModalIsOpen } = useContext(ModalContext)

  const modalCloseHandler: MouseEventHandler = (e) => {
    e.preventDefault()
    setModalIsOpen(false)
  }

  return (
    <div className='-mt-7 -mb-3'>
      <span onClick={modalCloseHandler} className='ml-6 text-xl hover:cursor-pointer'>
        X
      </span>
      <PostContainer isLoading={isLoading}>
        <PostInfoContainer>
          <ProfilePicBubble addedClasses='mx-5 h-8 w-8 mt-5' />
          <PostInfo post={post} />
        </PostInfoContainer>
        <PostContent content={post.content} addedClasses='ml-8 mt-3 border-l pl-8' />
      </PostContainer>
      <div className='ml-16 text-gray-500'>
        <span>Replying to: </span>
        <Link to={`/${post.username}`}>
          <span className='text-cyan-700'>@{post.username}</span>
        </Link>
      </div>
      <CreatePost isReply={true} replyModalPost={post} />
    </div>
  )
}

export default CreateReplyModal
