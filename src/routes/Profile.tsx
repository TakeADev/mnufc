import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { getUserDocFromUsername } from '../utils/firebase/firebase-config'

import { MenuContext } from '../contexts/MenuContext'
import { UserContext } from '../contexts/User'
import { ModalContext } from '../contexts/ModalContext'

import FeedContainer from '../components/Feed/FeedContainer'
import ProfileBanner from '../components/Profile/ProfileBanner'
import ProfilePostsTab from '../components/Profile/ProfilePostsTab'
import LoadingSpinner from '../components/LoadingSpinner'
import ProfilePhotosTab from '../components/Profile/ProfilePhotosTab'

function Profile({ tab }) {
  const [profileUserDoc, setProfileUserDoc] = useState(null)

  const { setIsOpen } = useContext(MenuContext)
  const { currentAuthUser, currentUserDoc } = useContext(UserContext)
  const { setModalIsOpen } = useContext(ModalContext)

  const navigate = useNavigate()
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
    navigate(`/${profileUserDoc.username}`)
  }

  const photosTabClickHandler = () => {
    navigate(`/${profileUserDoc.username}/photos`)
  }

  if (profileUserDoc) {
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
              } underline-offset-8 decoration-cyan-500 hover:cursor-pointer pb-5 px-2`}
              onClick={photosTabClickHandler}
            >
              <b>Photos</b>
            </span>
          </div>
        </div>
        {tab === 'main' && (
          <ProfilePostsTab profileUserDoc={profileUserDoc} currentAuthUser={currentAuthUser} />
        )}
        {tab === 'photos' && <ProfilePhotosTab profileUserDoc={profileUserDoc} />}
      </FeedContainer>
    )
  } else return <LoadingSpinner />
}

export default Profile
