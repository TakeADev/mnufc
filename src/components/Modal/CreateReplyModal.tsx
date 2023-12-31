import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getUserDocFromUsername } from '../../utils/firebase/firebase-config'

import { IUserPost } from '../../contexts/UserPosts'
import { IUserDoc } from '../../contexts/User'

import { FeedContext } from '../../contexts/FeedContext'
import { UserContext } from '../../contexts/User'

import PostContainer from '../Posts/PostContainer'
import PostInfoContainer from '../Posts/PostInfoContainer'
import ProfilePicBubble from '../Profile/ProfilePicBubble'
import PostInfo from '../Posts/PostInfo'
import PostContent from '../Posts/PostContent'
import CreatePost from '../CreatePost/CreatePost'
import LoadingSpinner from '../LoadingSpinner'

interface ICreateReplyModalProps {
  post: IUserPost
}

const CreateReplyModal: FunctionComponent<ICreateReplyModalProps> = ({ post }) => {
  const [postUser, setPostUser] = useState<null | IUserDoc>(null)

  const { isLoading } = useContext(FeedContext)
  const { currentAuthUser } = useContext(UserContext)

  useEffect(() => {
    getUserDocFromUsername(post.username).then((res: IUserDoc) => setPostUser(res))
  }, [])

  return (
    postUser && (
      <div className='-mt-7 -mb-3'>
        {currentAuthUser ? (
          <>
            <PostContainer isLoading={isLoading}>
              <PostInfoContainer>
                <ProfilePicBubble
                  addedClasses='mx-5 h-8 w-8 mt-5'
                  profilePic={postUser.profilePic.toString()}
                />
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
            <CreatePost isReply={true} replyModalPost={post} addedClasses='-mb-8' autoFocus />
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    )
  )
}

export default CreateReplyModal
