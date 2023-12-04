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
import { MdRepeat } from 'react-icons/md'

function Profile() {
  const { setIsOpen } = useContext(MenuContext)
  const { currentAuthUser, currentUserDoc } = useContext(UserContext)
  const { userPosts } = useContext(UserPostsContext)
  const { setModalIsOpen } = useContext(ModalContext)

  const [profileUserDoc, setProfileUserDoc] = useState(null)
  const [profilePosts, setProfilePosts] = useState(null)
  const [profileReposts, setProfileReposts] = useState(null)

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
    setProfileReposts(null)
    if (userPosts && profileUserDoc) {
      if (profileUserDoc.reposts) {
        let repostOriginals = []
        profileUserDoc.reposts.map((repost) => {
          const original = userPosts.find((post) => post.postId === repost.postId)
          repostOriginals.push({ ...original, isRepost: true, repostTimestamp: repost.timestamp })
        })
        setProfileReposts(repostOriginals)
      }
      setProfilePosts(
        userPosts.filter((post) => {
          return post.username === profileUserDoc.username
        })
      )
    } else return
  }, [userPosts, profileUserDoc])

  if (profileUserDoc) {
    let allProfilePosts = profileReposts ? profilePosts.concat(profileReposts) : profilePosts
    if (allProfilePosts) {
      const allProfilePostsSorted = allProfilePosts.sort((a, b) => {
        if (a.isRepost && b.isRepost) {
          return new Date(a.repostTimestamp.valueOf() - new Date(b.repostTimestamp.valueOf()))
        } else if (a.isRepost) {
          return new Date(a.repostTimestamp.valueOf() - new Date(b.timestamp.valueOf()))
        } else if (b.isRepost) {
          return new Date(a.repostTimestamp.valueOf() - new Date(b.timestamp.valueOf()))
        } else {
          return new Date(a.timestamp).valueOf() - new Date(b.timestamp).valueOf()
        }
      })
      allProfilePosts = allProfilePostsSorted
    }
    return (
      <FeedContainer>
        <ProfileBanner currentAuthUser={currentAuthUser} profileUserDoc={profileUserDoc} />
        <div className='text-center text-lg pt-5 pb-3 border-b border-l border-r border-slate-700'>
          <span>
            <b>Posts</b>
          </span>
        </div>
        {allProfilePosts ? (
          allProfilePosts.reverse().map((post) => {
            if (post.isRepost) {
              return (
                <div>
                  <div className='pl-5 pt-2 border-l border-r border-slate-700 text-gray-500'>
                    <MdRepeat className='inline mr-5 text-lg mt-0' />
                    <span className='text-sm'>{currentUserDoc.displayName} Reposted</span>
                  </div>
                  <Post key={post.postId} post={post} postPage={false} />
                </div>
              )
            }
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
