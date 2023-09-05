import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getUserDocFromUsername, getUserPostsByUsername } from '../utils/firebase/firebase-config'

import { MenuContext } from '../contexts/MenuContext'
import { FeedContext } from '../contexts/FeedContext'
import { UserContext } from '../contexts/User'

import ProfilePicBubble from '../components/Profile/ProfilePicBubble'
import FeedContainer from '../components/Feed/FeedContainer'
import Button from '../components/Button'
import PostContainer from '../components/Posts/PostContainer'
import PostInfoContainer from '../components/Posts/PostInfoContainer'
import PostInfo from '../components/Posts/PostInfo'
import PostContent from '../components/Posts/PostContent'
import LoadingSpinner from '../components/LoadingSpinner'

function Profile() {
  const { setIsOpen } = useContext(MenuContext)
  const { isLoading } = useContext(FeedContext)
  const { currentAuthUser } = useContext(UserContext)

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

  if (profileUserDoc) {
    return (
      <FeedContainer>
        <div>
          <img src='https://www.aashe.org/wp-content/uploads/2018/02/Placeholder-Banner.png' alt='' />
        </div>
        <div className='w-full flex-col -mt-20'>
          <div className='flex'>
            <div className='w-3/4'>
              <ProfilePicBubble addedClasses='w-32 h-32 ml-5' />
            </div>
            {currentAuthUser.uid === profileUserDoc.uid && (
              <div className='w-2-5'>
                <Button addedClasses='right-0 bg-slate-950 text-white border border-white px-5 h-10 mt-24 text-sm'>
                  <b>Edit Profile</b>
                </Button>
              </div>
            )}
          </div>
          <div className='ml-5 mt-5 flex-col'>
            <div>
              <span className='text-xl'>
                <b>{profileUserDoc.displayName}</b>
              </span>
            </div>
            <div>
              <span className='text-md'>@{profileUserDoc.username}</span>
            </div>
          </div>
        </div>
        <div className='text-center text-lg my-5'>
          <span>
            <u>
              <b>Posts</b>
            </u>
          </span>
        </div>
        {profilePosts ? (
          profilePosts.map((post) => {
            return (
              <PostContainer key={post.postId} isLoading={isLoading}>
                <PostInfoContainer>
                  <ProfilePicBubble profilePic={post.profilePic} addedClasses='mx-5 h-8 w-8' />
                  <PostInfo post={post} />
                </PostInfoContainer>
                <PostContent content={post.content} />
              </PostContainer>
            )
          })
        ) : (
          <LoadingSpinner />
        )}
      </FeedContainer>
    )
  } else {
    return <LoadingSpinner />
  }
}

export default Profile
