import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getUserDocFromUsername } from '../utils/firebase/firebase-config'

import { MenuContext } from '../contexts/MenuContext'
import { UserContext } from '../contexts/User'
import { UserPostsContext } from '../contexts/UserPosts'
import { ModalContext } from '../contexts/ModalContext'

import FeedContainer from '../components/Feed/FeedContainer'
import Post from '../components/Posts/Post'
import LoadingSpinner from '../components/LoadingSpinner'
import ProfileBanner from '../components/Profile/ProfileBanner'

function Profile() {
  const { setIsOpen } = useContext(MenuContext)
  const { currentAuthUser, currentUserDoc } = useContext(UserContext)
  const { userPosts } = useContext(UserPostsContext)
  const { setModalIsOpen } = useContext(ModalContext)

  const [profileUserDoc, setProfileUserDoc] = useState(null)
  const [profilePosts, setProfilePosts] = useState(null)

  const username = useParams().username.toLowerCase()
  const userProfile = getUserDocFromUsername(username)

  useEffect(() => {
    setModalIsOpen(false)
  }, [username])

  useEffect(() => {
    setIsOpen(false)
    userProfile.then((user) => {
      setProfileUserDoc(user)
    })
  }, [username, currentUserDoc])

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
            return <Post key={post.postId} post={post} postPage={false} />
          })
        ) : (
          <LoadingSpinner />
        )}
      </FeedContainer>
    )
  } else return <LoadingSpinner />
}

export default Profile
