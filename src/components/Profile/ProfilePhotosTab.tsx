import { useContext, FunctionComponent } from 'react'

import { useNavigate, useParams } from 'react-router'

import { UserPostsContext } from '../../contexts/UserPosts'

import { IUserDoc } from '../../contexts/User'
import { IUserPost } from '../../contexts/UserPosts'

interface IProfilePhotosTabProps {
  profileUserDoc: IUserDoc
}

const ProfilePhotosTab: FunctionComponent<IProfilePhotosTabProps> = ({ profileUserDoc }) => {
  const { userPosts } = useContext(UserPostsContext)

  const navigate = useNavigate()
  let photoPosts = []

  if (userPosts) {
    userPosts.map((post) => {
      if (post.uid === profileUserDoc.uid) {
        post.attachedPhoto && photoPosts.push(post)
      }
    })
  }

  if (photoPosts) {
    return (
      <div className='grid grid-cols-3 auto-rows-fr gap-2 max-h-[500px]'>
        {photoPosts.map((post, index) => (
          <div
            className='hover:scale-[101%] hover:cursor-pointer'
            key={index}
            onClick={() => navigate(`/${post.username}/status/${post.postId}/photo`)}
          >
            <img src={post.attachedPhoto} className='h-full w-full object-cover' />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='text-center text-3xl mt-10 text-gray-400'>
      <span>This user has not uploaded any photos yet.</span>
    </div>
  )
}

export default ProfilePhotosTab
