import { FunctionComponent, useContext } from 'react'
import { Link } from 'react-router-dom'

import { IUserPost } from '../../contexts/UserPosts'

import { FeedContext } from '../../contexts/FeedContext'
import { UserContext } from '../../contexts/User'

import PostContainer from '../Posts/PostContainer'
import PostInfoContainer from '../Posts/PostInfoContainer'
import ProfilePicBubble from '../Profile/ProfilePicBubble'
import PostInfo from '../Posts/PostInfo'
import PostContent from '../Posts/PostContent'
import CreatePost from '../CreatePost/CreatePost'

interface ICreateReplyModalProps {
  post: IUserPost
}

const CreateReplyModal: FunctionComponent<ICreateReplyModalProps> = ({ post }) => {
  const { isLoading } = useContext(FeedContext)
  const { currentAuthUser } = useContext(UserContext)

  return (
    <div className='-mt-7 -mb-3'>
      {currentAuthUser && (
        <>
          <PostContainer isLoading={isLoading}>
            <PostInfoContainer>
              <ProfilePicBubble addedClasses='mx-5 h-8 w-8 mt-5' />
              <PostInfo post={post} />
            </PostInfoContainer>
            <div className='border-l border-slate-500 ml-9 -mt-3'>
              <PostContent content={post.content} addedClasses='mt-3 ml-8 mr-8' />
              <div className='ml-8 text-gray-500'>
                <span>Replying to: </span>
                <Link to={`/${post.username}`}>
                  <span className='text-cyan-700'>@{post.username}</span>
                </Link>
              </div>
            </div>
          </PostContainer>
          <CreatePost isReply={true} replyModalPost={post} addedClasses='-mb-8' />
        </>
      )}
    </div>
  )
}

export default CreateReplyModal
