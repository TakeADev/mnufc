import { useState, useContext, FunctionComponent, useRef } from 'react'

import { useParams } from 'react-router-dom'

import Button from '../Button'
import { UserContext } from '../../contexts/User'
import { IUserPost, UserPostsContext } from '../../contexts/UserPosts'
import { ModalContext } from '../../contexts/ModalContext'
import { MdClose, MdOutlinePhoto } from 'react-icons/md'
import { uploadUserPhoto } from '../../utils/firebase/firebase-config'

interface ICreatePostProps {
  isReply?: boolean
  replyModalPost?: IUserPost
  addedClasses?: string
  autoFocus?: boolean
  attachedPhoto?: string
}

const CreatePost: FunctionComponent<ICreatePostProps> = ({
  isReply,
  replyModalPost,
  addedClasses,
  autoFocus,
}) => {
  const [postData, setPostData] = useState('')
  const [attachedPhoto, setAttachedPhoto] = useState(null)

  const { currentAuthUser, currentUserDoc } = useContext(UserContext)
  const { createNewUserPost } = useContext(UserPostsContext)
  const { setModalIsOpen } = useContext(ModalContext)

  const resetFormValue = () => {
    setPostData('')
  }

  const onChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void = (e) => {
    setPostData(e.target.value)
  }

  let replyTo: string | false = false

  //Checks if post created will be a reply and assigns original post id to reply document.
  if (isReply) {
    if (useParams().postId) {
      replyTo = useParams().postId
    } else {
      replyTo = replyModalPost.postId
    }
  }

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent) => {
    e.preventDefault()
    if (postData || attachedPhoto) {
      resetFormValue()
      if (attachedPhoto) {
        await uploadUserPhoto(attachedPhoto, currentUserDoc).then((res) =>
          createNewUserPost(currentAuthUser, postData, replyTo, res)
        )
        setAttachedPhoto(null)
      } else createNewUserPost(currentAuthUser, postData, replyTo)
    }
    setAttachedPhoto(null)
    setModalIsOpen(false)
  }

  //Calls onSubmitHandler when user presses 'Enter' on text area
  const postEnterSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.shiftKey == false) {
      onSubmitHandler(e)
    }
  }

  const inputPhoto = useRef(null)

  const inputPhotoClickHandler = () => {
    inputPhoto.current.click()
  }

  const inputPhotoChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()

    reader.readAsDataURL(e.target.files[0])
    reader.onload = (e) => {
      setAttachedPhoto(e.target.result)
    }
  }

  const attachedPhotoCloseClickHandler = () => {
    setAttachedPhoto(null)
  }

  return (
    <div
      className={`pb-5 pt-5 mx-auto px-3 ${
        //Adds styling only if not in reply modal
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
          className='bg-slate-950 focus:ring-0  focus:outline-none p-3 rounded-lg resize-none w-full'
        />
        {attachedPhoto && (
          <div className='relative'>
            <MdClose
              className='text-3xl bg-opacity-70 absolute bg-gray-700 rounded-full p-1 m-3 cursor-pointer'
              onClick={attachedPhotoCloseClickHandler}
            />
            <img src={attachedPhoto} className='rounded-lg mb-0 max-h-[500px]' />
          </div>
        )}
        <div className='mt-5'>
          <div className='absolute ml-3 -mt-1 text-3xl text-cyan-500 rounded-lg hover:bg-gray-700 hover:cursor-pointer'>
            <MdOutlinePhoto className='' onClick={inputPhotoClickHandler} />
            <input
              type='file'
              id='inputPhoto'
              ref={inputPhoto}
              accept='.png, .jpg, .jpeg'
              className='hidden'
              onChange={inputPhotoChangeHandler}
            />
          </div>
        </div>
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
