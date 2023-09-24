import React, { useContext, useEffect, useState } from 'react'
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

  const navigateToProfileOnClick = (e) => {
    e.preventDefault()
    navigate(`/${post.username}`)
  }

  useEffect(() => {
    getUserDocFromUid(uid).then((snap) => {
      setPostUser(snap)
      setIsLoading(false)
    })
  }, [currentUserDoc])

  if (postUser) {
    return (
      <div className='w-max mt-5 max-h-10 mb-0 -ml-2'>
        <span onClick={navigateToProfileOnClick} className=''>
          <b>{postUser.displayName}</b>
        </span>
        <span onClick={navigateToProfileOnClick} className='ml-3 text-gray-500 text-sm'>
          @{username}
        </span>
        <span className='ml-3 text-gray-500 text-xs'>{timestamp}</span>
      </div>
    )
  } else {
    return
  }
}

export default PostInfo
