import React, { useEffect, useState } from 'react'
import { getUserDocFromUid } from '../../utils/firebase/firebase-config'

function PostInfo({ post }) {
  const { username, timestamp, uid } = post
  const [postUser, setPostUser] = useState(null)

  useEffect(() => {
    getUserDocFromUid(uid).then((snap) => {
      setPostUser(snap)
    })
  }, [])

  if (postUser) {
    return (
      <div className='w-max mt-5 max-h-10 mb-0'>
        <span className=''>
          <b>{postUser.displayName}</b>
        </span>
        <span className='ml-3 text-gray-500 text-sm'>@{username}</span>
        <span className='ml-3 text-gray-500 text-xs'>{timestamp}</span>
      </div>
    )
  } else {
    return (
      <div className='w-max mt-5 max-h-10 mb-0'>
        <span className=''> </span>
        <span className='ml-3 text-gray-500 text-sm'>@{username}</span>
        <span className='ml-3 text-gray-500 text-xs'>{timestamp}</span>
      </div>
    )
  }
}

export default PostInfo
