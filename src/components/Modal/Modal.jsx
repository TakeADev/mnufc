import { useContext } from 'react'
import EditProfileForm from '../Forms/EditProfileForm'

import { ModalContext } from '../../contexts/ModalContext'

function Modal({ children }) {
  const { modalIsOpen, modalType } = useContext(ModalContext)

  return (
    <div className=''>
      {modalIsOpen && (
        <div className={`mt-28 fixed mx-auto w-full z-50 h-screen `}>
          <div className='bg-slate-900 h-3/4 w-3/5 lg:w-1/2 max-w-xl z-0 mx-auto rounded-xl'>
            {modalType == 'editProfile' && <EditProfileForm />}
          </div>
        </div>
      )}

      <div className={`${modalIsOpen && 'opacity-40 bg-gray-500 '}w-full h-full -z-10`}>
        {children}
      </div>
    </div>
  )
}

export default Modal
