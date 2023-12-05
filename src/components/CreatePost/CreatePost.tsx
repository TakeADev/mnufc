import { useState, useContext, FunctionComponent } from 'react'

import { useParams } from 'react-router-dom'

import Button from '../Button'
import { UserContext } from '../../contexts/User'
import { IUserPost, UserPostsContext } from '../../contexts/UserPosts'
import { ModalContext } from '../../contexts/ModalContext'

interface ICreatePostProps {
  isReply?: boolean
  replyModalPost?: IUserPost
  addedClasses?: string
  autoFocus?: boolean
}

const CreatePost: FunctionComponent<ICreatePostProps> = ({
  isReply,
  replyModalPost,
  addedClasses,
  autoFocus,
}) => {
  const [postData, setPostData] = useState('')
  const { currentAuthUser } = useContext(UserContext)
  const { createNewUserPost } = useContext(UserPostsContext)
  const { setModalIsOpen } = useContext(ModalContext)

  const resetFormValue = () => {
    setPostData('')
  }

  const onChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void = (e) => {
    setPostData(e.target.value)
  }

  let replyTo: String | false = false

  if (isReply) {
    if (useParams().postId) {
      replyTo = useParams().postId
    } else {
      replyTo = replyModalPost.postId
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (postData) {
      resetFormValue()
      createNewUserPost(currentAuthUser, postData, replyTo)
    }
    setModalIsOpen(false)
  }

  const postEnterSubmit = (e) => {
    if (e.key === 'Enter' && e.shiftKey == false) {
      onSubmitHandler(e)
    }
  }

  return (
    <div
      className={`pb-3 pt-5 mx-auto px-3 ${
        !replyModalPost && 'border-slate-700 border-l border-r border-b'
      } ${addedClasses}`}
    >
      <form action='submit' onSubmit={onSubmitHandler}>
        <textarea
          autoFocus={false || autoFocus}
          name='postContent'
          maxLength={250}
          id=''
          cols={73}
          rows={3}
          value={postData}
          onChange={onChangeHandler}
          onKeyDown={postEnterSubmit}
          placeholder={isReply ? `Write a reply...` : `Write a post...`}
          className='bg-slate-800 focus:ring-0 focus:border focus:border-cyan-600 focus:outline-none p-3 rounded-lg resize-none w-full'
        />
        <div className='text-right mt-2'>
          <Button type='submit' addedClasses='w-20'>
            Post
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost
