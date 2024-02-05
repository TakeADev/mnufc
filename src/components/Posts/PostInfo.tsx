import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getUserDocFromUid } from '../../utils/firebase/firebase-config'

import { FeedContext } from '../../contexts/FeedContext'
import { UserContext } from '../../contexts/User'

function PostInfo({ post }) {
  const [postUser, setPostUser] = useState(null)

  const { setIsLoading } = useContext(FeedContext)
  const { currentUserDoc } = useContext(UserContext)

  const { username, timestamp, uid } = post

  const navigate = useNavigate()

  const navigateToProfileOnClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate(`/${post.username}`)
  }

  let date: string

  const getTime = () => {
    if ((Date.now() - timestamp) / 1000 / 60 / 60 > 12) {
      date = new Date(timestamp).toLocaleDateString()
      return
    }
    if (
      (Date.now() - timestamp) / 1000 / 60 / 60 < 12 &&
      (Date.now() - timestamp) / 1000 / 60 / 60 > 1
    ) {
      date = Math.round((Date.now() - timestamp) / 1000 / 60 / 60) + 'h'
      return
    }
    if ((Date.now() - timestamp) / 1000 > 60) {
      date = Math.round((Date.now() - timestamp) / 1000 / 60) + 'm'
      return
    }
    if ((Date.now() - timestamp) / 1000 < 60) {
      date = Math.round((Date.now() - timestamp) / 1000) + 's'
      return
    }
  }

  getTime()

  useEffect(() => {
    getUserDocFromUid(uid).then((snap) => {
      setPostUser(snap)
      setIsLoading(false)
    })
  }, [currentUserDoc])

  if (postUser) {
    return (
      <div className='w-full max-w-[82vw] mt-1 max-h-10 mb-0 -ml-2 flex'>
        <div className='basis-1/3 max-w-fit overflow-hidden inline '>
          <span onClick={navigateToProfileOnClick} className=''>
            <b>{postUser.displayName}</b>
          </span>
        </div>
        <div className='basis-1/3 max-w-fit overflow-hidden inline'>
          <span onClick={navigateToProfileOnClick} className='ml-3 text-gray-500 text-sm'>
            @{username}
          </span>
        </div>
        <div className='basis-1/3 overflow-hidden inline'>
          <span className='ml-3 text-gray-500 text-xs'>{date}</span>
        </div>
      </div>
    )
  } else {
    return
  }
}

export default PostInfo
