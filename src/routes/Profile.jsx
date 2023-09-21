import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getUserDocFromUsername, getUserPostsByUsername } from '../utils/firebase/firebase-config'

import { MenuContext } from '../contexts/MenuContext'
import { UserContext } from '../contexts/User'

import FeedContainer from '../components/Feed/FeedContainer'
import Post from '../components/Posts/Post'
import LoadingSpinner from '../components/LoadingSpinner'
import ProfileBanner from '../components/Profile/ProfileBanner'

function Profile() {
  const { setIsOpen } = useContext(MenuContext)
  const { currentAuthUser, currentUserDoc } = useContext(UserContext)

  const [profileUserDoc, setProfileUserDoc] = useState(null)

  const username = useParams().username.toLowerCase()
  const profilePosts = getUserPostsByUsername(username)
  const userProfile = getUserDocFromUsername(username)

  useEffect(() => {
    setIsOpen(false)
  }, [username])

  useEffect(() => {
    userProfile.then((user) => {
      setProfileUserDoc(user)
    })
  }, [username])

  useEffect(() => {
    userProfile.then((user) => {
      setProfileUserDoc(user)
    })
  }, [currentUserDoc])

  if (profileUserDoc) {
    return (
      <FeedContainer>
        <ProfileBanner currentAuthUser={currentAuthUser} profileUserDoc={profileUserDoc} />
        <div className='text-center text-lg my-5'>
          <span>
            <u>
              <b>Posts</b>
            </u>
          </span>
        </div>
        {profilePosts ? (
          profilePosts.map((post) => {
            return <Post key={post.postId} post={post} />
          })
        ) : (
          <LoadingSpinner />
        )}
      </FeedContainer>
    )
  } else return <LoadingSpinner />
}

export default Profile
