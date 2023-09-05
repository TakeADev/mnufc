import React, { useState, useContext } from 'react'

import Button from '../Button'
import { UserContext } from '../../contexts/User'
import { createUserPost } from '../../utils/firebase/firebase-config'
import { UserPostsContext } from '../../contexts/UserPosts'

function CreatePost() {
  const [postData, setPostData] = useState('')
  const { currentAuthUser } = useContext(UserContext)
  const { createNewUserPost } = useContext(UserPostsContext)

  const resetFormValue = () => {
    setPostData('')
  }

  const onChangeHandler = (e) => {
    setPostData(e.target.value)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    resetFormValue()
    createNewUserPost(currentAuthUser, postData)
  }

  const postEnterSubmit = (e) => {
    if (e.key === 'Enter' && e.shiftKey == false) {
      onSubmitHandler(e)
    }
  }

  return (
    <div className='mb-5 flex mx-3'>
      <form action='submit' onSubmit={onSubmitHandler}>
        <textarea
          name='postContent'
          maxLength='250'
          id=''
          cols='73'
          rows='3'
          value={postData}
          onChange={onChangeHandler}
          onKeyDown={postEnterSubmit}
          placeholder='Write a post...'
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
