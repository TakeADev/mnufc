import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getUserDocFromUsername, getUserPostsByUsername } from '../utils/firebase/firebase-config'

import { MenuContext } from '../contexts/MenuContext'
import { UserContext } from '../contexts/User'
import { UserPostsContext } from '../contexts/UserPosts'

import FeedContainer from '../components/Feed/FeedContainer'
import Post from '../components/Posts/Post'
import LoadingSpinner from '../components/LoadingSpinner'
import ProfileBanner from '../components/Profile/ProfileBanner'

function Profile() {
  const { setIsOpen } = useContext(MenuContext)
  const { currentAuthUser } = useContext(UserContext)
  const { userPosts } = useContext(UserPostsContext)

  const [profileUserDoc, setProfileUserDoc] = useState(null)
  const [profilePosts, setProfilePosts] = useState(null)

  const username = useParams().username.toLowerCase()
  const userProfile = getUserDocFromUsername(username)

  useEffect(() => {
    setIsOpen(false)
    userProfile.then((user) => {
      setProfileUserDoc(user)
    })
  }, [username])

  useEffect(() => {
    if (userPosts && profileUserDoc)
      setProfilePosts(
        userPosts.filter((post) => {
          return post.username === profileUserDoc.username
        })
      )
    else return
  }, [userPosts, profileUserDoc])

  if (profileUserDoc) {
    return (
      <FeedContainer>
        <ProfileBanner currentAuthUser={currentAuthUser} profileUserDoc={profileUserDoc} />
        <div className='text-center text-lg mt-5 pb-3 border-b border-slate-700'>
          <span>
            <b>Posts</b>
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
