import { useEffect, useState } from 'react'

import { useParams, useNavigate } from 'react-router'

import { MdArrowBack, MdMoreHoriz } from 'react-icons/md'

import { getPostByPostId } from '../../utils/firebase/firebase-config'

import { IUserPost } from '../../contexts/UserPosts'

import PostInteractionBar from '../Posts/PostInteractionBar'

const PhotoPreview = () => {
  const [post, setPost] = useState<IUserPost | null>(null)
  const [photoMenuIsOpen, setPhotoMenuIsOpen] = useState<boolean>(false)

  const params = useParams()
  const navigate = useNavigate()

  const photoMenuClickHandler = () => {
    setPhotoMenuIsOpen(true)
  }

  const photoMenuCloseHandler = () => {
    setPhotoMenuIsOpen(false)
  }

  const navigateToPostOnClick = () => {
    navigate(`/${post.username}/status/${post.postId}`)
  }

  useEffect(() => {
    getPostByPostId(params.postId).then((res: IUserPost) => setPost(res))
  }, [params])

  useEffect(() => {
    document.addEventListener('mouseup', photoMenuCloseHandler)
  })

  if (post && post.attachedPhoto) {
    return (
      <div className=''>
        <div className='px-5 h-screen flex -mt-20 '>
          <div className='m-auto relative'>
            <MdArrowBack
              className='absolute ml-3 text-white text-4xl mr-auto p-1 bg-slate-950 rounded-full mt-5 bg-opacity-70 hover:cursor-pointer hover:bg-slate-900'
              onClick={() => {
                navigate(-1)
              }}
            />
            <MdMoreHoriz
              className={`absolute right-3 text-white text-4xl  mr-auto p-1 bg-slate-950 rounded-full mt-5 bg-opacity-70 hover:cursor-pointer hover:bg-slate-900 ${
                photoMenuIsOpen && 'hidden'
              }`}
              onClick={photoMenuClickHandler}
            />
            <div
              className={`
        absolute w-2/5 sm:w-1/5 right-0 mt-2 mr-2 border border-slate-700 rounded-lg bg-slate-950 
        outline outline-1 outline-cyan-500 ${!photoMenuIsOpen && 'hidden'}  `}
            >
              <div
                className='pl-6 py-2 hover:bg-slate-900 z-20 hover:cursor-pointer'
                onClick={navigateToPostOnClick}
              >
                <span className='font-bold'>Go to post</span>
              </div>
            </div>
            <img src={post.attachedPhoto} className='max-h-[80vh] -z-10' />
            <div className='mt-5'>
              <PostInteractionBar post={post} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PhotoPreview
