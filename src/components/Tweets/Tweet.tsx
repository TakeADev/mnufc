import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import TweetMenu from './TweetMenu'
import PostContainer from '../Posts/PostContainer'
import PostInfoContainer from '../Posts/PostInfoContainer'
import ProfilePicBubble from '../Profile/ProfilePicBubble'
import TweetInfo from './TweetInfo'
import PostContent from '../Posts/PostContent'

import { ITweet } from '../../contexts/TweetsContext'
import { FunctionComponent, useEffect, useState } from 'react'

interface ITweetProps {
  tweet: ITweet
}

const Tweet: FunctionComponent<ITweetProps> = ({ tweet }) => {
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const navigateToProfileOnClick = () => {
    return
  }

  useEffect(() => {
    setIsLoading(true)
    if (tweet) {
      setIsLoading(false)
    }
  }, [tweet])

  if (tweet) {
    console.log('www.' + tweet.videoThumbnail)
    return (
      <Link to={tweet.link}>
        <div className='w-full relative'>
          <TweetMenu tweet={tweet} />
          <PostContainer
            isLoading={isLoading}
            addedClasses='border-b border-l border-r border-slate-700 pr-2 md:pr-16 pt-2 '
          >
            <PostInfoContainer>
              <ProfilePicBubble
                onClick={navigateToProfileOnClick}
                profilePic={
                  'https://pbs.twimg.com/profile_images/1636516591532744704/C6k7-0jB_400x400.jpg'
                }
                addedClasses='mx-4 h-10 w-10 mt-2'
              />
              <TweetInfo tweet={tweet} />
            </PostInfoContainer>
            <PostContent content={tweet.content} addedClasses='ml-16' />
            {tweet.videoThumbnail && <img src={`http://www.${tweet.videoThumbnail}`} />}
            {tweet.attachedPhotos.length > 1 ? (
              <div className='grid grid-cols-2 gap-2  ml-16 mb-5 rounded-lg '>
                {tweet.attachedPhotos.map((pic) => {
                  return (
                    <div className=''>
                      <img src={pic} className='flex max-h-[300px] w-full object-cover' />
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className='pr-16'>
                <img
                  src={tweet.attachedPhotos[0]}
                  className='max-h-[500px] rounded-lg ml-16 mb-5'
                />
              </div>
            )}
          </PostContainer>
        </div>
      </Link>
    )
  }
}

export default Tweet
