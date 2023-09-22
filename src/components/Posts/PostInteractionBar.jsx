import { MdChat, MdFavoriteBorder, MdFavorite, MdRepeat } from 'react-icons/md'

const PostInteractionBar = () => {
  return (
    <div className='flex w-full text-center mb-3'>
      <div className='w-1/3'>
        <MdChat className='text-xl mx-auto inline' />
        <span className='ml-2'>0</span>
      </div>
      <div className='w-1/3'>
        <MdFavoriteBorder className='text-xl mx-auto inline' />
        <span className='ml-2'>0</span>
      </div>
      <div className='w-1/3'>
        <MdRepeat className='text-xl mx-auto inline' />
        <span className='ml-2'>0</span>
      </div>
    </div>
  )
}

export default PostInteractionBar
