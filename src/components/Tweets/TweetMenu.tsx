import { useState, useContext, useEffect } from 'react'
import { MdMoreHoriz, MdOutlineShare } from 'react-icons/md'

import { FlashMessageContext } from '../../contexts/FlashMessageContext'

import { FLASH_TYPES } from '../../contexts/FlashMessageContext'
const { copy } = FLASH_TYPES

const TweetMenu = ({ tweet }) => {
  const [isOpen, setIsOpen] = useState(false)

  const { setFlashType } = useContext(FlashMessageContext)

  const menuIconClickHandler = (e: React.MouseEvent) => {
    e.preventDefault()

    setIsOpen(true)
  }
  const menuClickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  const menuCloseHandler = () => {
    if (isOpen) {
      setIsOpen(false)
    }
  }

  const shareButtonHandler = () => {
    setFlashType(copy)
    navigator.clipboard.writeText(tweet.link)
  }

  useEffect(() => {
    document.addEventListener('mouseup', menuCloseHandler)
  })

  return (
    <div className='pointer-events-auto' onClick={menuClickHandler}>
      <MdMoreHoriz
        className='absolute right-5 text-3xl text-slate-500 hover:bg-slate-800 rounded-full p-0.5 hover:cursor-pointer mt-2'
        onClick={menuIconClickHandler}
      />
      <div
        className={`
        absolute w-2/5 right-0 mt-2 mr-2 border border-slate-700 rounded-lg bg-slate-950 
        outline outline-1 outline-mn-blue  ${!isOpen && 'hidden '}`}
      >
        <div className='pl-6 text-slate-300 py-2 hover:bg-slate-900' onClick={shareButtonHandler}>
          <MdOutlineShare className='inline mb-1 text-md mr-3' />
          <span className='font-bold'>Share Post</span>
        </div>
      </div>
    </div>
  )
}

export default TweetMenu
