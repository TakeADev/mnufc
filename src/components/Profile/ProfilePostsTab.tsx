import { useEffect, useContext, useState } from 'react'

import { MdRepeat } from 'react-icons/md'

import { UserContext } from '../../contexts/User'
import { UserPostsContext } from '../../contexts/UserPosts'

import { IUserRepost } from '../../contexts/UserPosts'

import CreatePost from '../CreatePost/CreatePost'
import Post from '../Posts/Post'
import LoadingSpinner from '../LoadingSpinner'

const ProfilePostsTab = ({ profileUserDoc, currentAuthUser }) => {
  const [profilePosts, setProfilePosts] = useState(null)
  const [profileReposts, setProfileReposts] = useState(null)

  const { currentUserDoc } = useContext(UserContext)
  const { userPosts } = useContext(UserPostsContext)

  useEffect(() => {
    setProfileReposts(null)
    if (userPosts && profileUserDoc) {
      if (profileUserDoc.reposts) {
        let repostOriginals = []
        profileUserDoc.reposts.map((repost: IUserRepost) => {
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

  let allProfilePosts = profileReposts ? profilePosts.concat(profileReposts) : profilePosts
  if (allProfilePosts) {
    const allProfilePostsSorted = allProfilePosts.sort((a: any, b: any) => {
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
    <div>
      {currentAuthUser.uid === profileUserDoc.uid && <CreatePost />}
      {allProfilePosts ? (
        allProfilePosts.reverse().map((post: any) => {
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
    </div>
  )
}

export default ProfilePostsTab
