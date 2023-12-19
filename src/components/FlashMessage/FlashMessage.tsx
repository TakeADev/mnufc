import { useContext } from 'react'

import { FlashMessageContext } from '../../contexts/FlashMessageContext'
import { FLASH_TYPES } from '../../contexts/FlashMessageContext'

import '../../styles/animations.scss'

const FlashMessage = () => {
  const { flashType } = useContext(FlashMessageContext)

  switch (flashType) {
    case FLASH_TYPES.copy:
      return (
        <div className='absolute z-50 w-full min-h-screen flex justify-center pointer-events-none'>
          <div className='fixed top-36 bg-orange-300 text-center px-10 text-xl text-orange-700 fade-in-and-out rounded-lg py-2'>
            <span className=''>Link has been coppied to your clipboard</span>
          </div>
        </div>
      )
  }
}

export default FlashMessage
