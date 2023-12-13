import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getUserDocFromUsername } from '../utils/firebase/firebase-config'

import { MenuContext } from '../contexts/MenuContext'
import { UserContext } from '../contexts/User'
import { ModalContext } from '../contexts/ModalContext'

import FeedContainer from '../components/Feed/FeedContainer'
import ProfileBanner from '../components/Profile/ProfileBanner'
import ProfilePostsTab from '../components/Profile/ProfilePostsTab'
import LoadingSpinner from '../components/LoadingSpinner'
import ProfilePhotosTab from '../components/Profile/ProfilePhotosTab'

function Profile() {
  const { setIsOpen } = useContext(MenuContext)
  const { currentAuthUser, currentUserDoc } = useContext(UserContext)
  const { setModalIsOpen } = useContext(ModalContext)

  const [profileUserDoc, setProfileUserDoc] = useState(null)
  const [tab, setTab] = useState('posts')

  const username = useParams().username.toLowerCase()

  useEffect(() => {
    setModalIsOpen(false)
  }, [username])

  useEffect(() => {
    setIsOpen(false)
    getUserDocFromUsername(username).then((res) => {
      setProfileUserDoc(res)
    })
  }, [username, currentUserDoc])

  const postsTabClickHandler = () => {
    setTab('posts')
  }

  const photosTabClickHandler = () => {
    setTab('photos')
  }

  if (profileUserDoc) {
    console.log(profileUserDoc)
    return (
      <FeedContainer>
        <ProfileBanner currentAuthUser={currentAuthUser} profileUserDoc={profileUserDoc} />
        <div className='flex text-lg pt-5 pb-3 border-b border-l border-r border-slate-700'>
          <div className='w-1/2 text-center'>
            <span
              className={`${
                tab === 'posts' && 'underline'
              } underline-offset-8 decoration-cyan-500 hover:cursor-pointer pb-5 px-2`}
              onClick={postsTabClickHandler}
            >
              <b>Posts</b>
            </span>
          </div>
          <div className='w-1/2 text-center'>
            <span
              className={`${
                tab === 'photos' && 'underline'
              } underline-offset-8 decoration-cyan-500 hover:cursor-pointer`}
              onClick={photosTabClickHandler}
            >
              <b>Photos</b>
            </span>
          </div>
        </div>
        {tab === 'posts' && (
          <ProfilePostsTab profileUserDoc={profileUserDoc} currentAuthUser={currentAuthUser} />
        )}
        {tab === 'photos' && <ProfilePhotosTab profileUserDoc={profileUserDoc} />}
      </FeedContainer>
    )
  } else return <LoadingSpinner />
}

export default Profile
