import { useNavigate } from 'react-router'

const TweetInfo = ({ tweet }) => {
  const { timestamp } = tweet

  const navigate = useNavigate()

  const navigateToProfileOnClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate(`/MNUFC`)
  }

  let date: string

  const getTime = () => {
    if ((Date.now() - timestamp) / 1000 / 60 / 60 > 12) {
      date = new Date(timestamp).toLocaleDateString()
      return
    }
    if (
      (Date.now() - timestamp) / 1000 / 60 / 60 < 12 &&
      (Date.now() - timestamp) / 1000 / 60 / 60 > 1
    ) {
      date = Math.round((Date.now() - timestamp) / 1000 / 60 / 60) + 'h'
      return
    }
    if ((Date.now() - timestamp) / 1000 > 60) {
      date = Math.round((Date.now() - timestamp) / 1000 / 60) + 'm'
      return
    }
    if ((Date.now() - timestamp) / 1000 < 60) {
      date = Math.round((Date.now() - timestamp) / 1000) + 's'
      return
    }
  }

  getTime()

  return (
    <div className='w-max mt-1 max-h-10 mb-0 -ml-2'>
      <span onClick={navigateToProfileOnClick} className=''>
        <b>MNUFC</b>
      </span>
      <span onClick={navigateToProfileOnClick} className='ml-3 text-gray-500 text-sm'>
        @MNUFC via Twitter
      </span>
      <span className='ml-3 text-gray-500 text-xs'>{date}</span>
    </div>
  )
}

export default TweetInfo
