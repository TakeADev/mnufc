import { useContext, useEffect, useState } from 'react'

import { getUserDocFromAuth } from '../../utils/firebase/firebase-config'

import { UserContext } from '../../contexts/User'

import ProfileBannerImage from '../Profile/ProfileBannerImage'
import ProfilePicBubble from '../Profile/ProfilePicBubble'
import Button from '../Button'

function Modal({ children }) {
  const { currentAuthUser, currentUserDoc, setCurrentUserDoc } =
    useContext(UserContext)

  const defaultFormFields = {
    name: '',
    bio: '',
    location: '',
    birthDate: new Date(),
  }

  const [formFields, setFormFields] = useState(defaultFormFields)

  useEffect(() => {
    if (currentAuthUser) {
      try {
        getUserDocFromAuth(currentAuthUser).then((res) =>
          setCurrentUserDoc(res)
        )
      } catch (err) {
        console.log(err)
      }
    }
  }, [currentAuthUser])

  const resetFormFields = () => {
    setFormValue(defaultFormFields)
  }
  const onChangeHandler = (e) => {
    const { name } = e.target

    e.preventDefault()
    setFormFields({ ...formFields, [name]: e.target.value })
  }

  const onSubmitHandler = () => {
    resetFormFields()
  }

  return (
    <div className=''>
      <div className='w-full h-screen mt-20 fixed mx-auto z-50'>
        <div className='bg-slate-900 h-3/4 w-3/5 lg:w-1/2 xl:w-1/3 z-0 mx-auto flex-row rounded-3xl'>
          <div className='flex my-2'>
            <div className=' text-center text-lg w-1/12 pt-1'>
              <span className='text-gray-500'>X</span>
            </div>
            <div className='w-10/12 mt-1 text-xl'>
              <span className=''>
                <b>Edit Profile</b>
              </span>
            </div>
            <div className=' w-1/6 text-lg'>
              <Button addedClasses='w-full mt-1'>Save</Button>
            </div>
          </div>
          <ProfileBannerImage />
          <ProfilePicBubble addedClasses='w-24 h-24 -mt-12' />
          <form></form>
          <div className='mt-5 mx-auto text-center'>
            <label className='absolute text-gray-800 ml-2'>Name</label>
            <input
              type='text'
              className='w-11/12 h-14 bg-slate-900 border border-white rounded-md focus:border-cyan-300 focus:outline-none focus:ring-0 pl-2 pt-5'
              name='name'
              value={formFields.name}
              onChange={onChangeHandler}
            />
          </div>
          <div className='mt-5 mx-auto text-center'>
            <label className='absolute text-gray-800 ml-2'>Bio</label>
            <input
              tyre='text'
              className='w-11/12 h-14 bg-slate-900 border border-white rounded-md focus:border-cyan-300 focus:outline-none focus:ring-0 pl-2 pt-5'
            />
          </div>
          <div className='mt-5 mx-auto text-center'>
            <label className='absolute text-gray-800 ml-2'>Location</label>
            <input
              type='text'
              className='w-11/12 h-14 bg-slate-900 border border-white rounded-md focus:border-cyan-300 focus:outline-none focus:ring-0 pl-2 pt-5'
            />
          </div>
        </div>
      </div>

      <div className='w-full h-screen bg-gray-900 opacity-50 -z-10'>
        {children}
      </div>
    </div>
  )
}

export default Modal
