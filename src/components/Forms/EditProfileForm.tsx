import { useEffect, useState, useContext, useRef } from 'react'

import { getUserDocFromAuth, updateUserProfile } from '../../utils/firebase/firebase-config'

import { MdCameraAlt } from 'react-icons/md'

import { UserContext } from '../../contexts/User.jsx'
import { ModalContext } from '../../contexts/ModalContext'
import { CropperContext } from '../../contexts/CropperContext.js'

import ProfilePicBubble from '../Profile/ProfilePicBubble'
import ProfileBannerImage from '../Profile/ProfileBannerImage'
import Button from '../Button'
import FormInput from './FormInput'

interface IEditProfileFormFields {
  displayName: String
  bio: String
  location: String
  birthDate: Date | ''
}

const EditProfileForm = () => {
  const { currentAuthUser, setCurrentUserDoc, currentUserDoc } = useContext(UserContext)
  const { modalIsOpen, setModalIsOpen, setModalType } = useContext(ModalContext)
  const { setPhotoToBeCropped } = useContext(CropperContext)

  const defaultFormFields: IEditProfileFormFields = {
    displayName: '',
    bio: '',
    location: '',
    birthDate: new Date(),
  }

  const [formFields, setFormFields] = useState<IEditProfileFormFields>(defaultFormFields)

  useEffect(() => {
    if (currentAuthUser) {
      try {
        getUserDocFromAuth(currentAuthUser).then((res) => setCurrentUserDoc(res))
      } catch (err) {
        console.log(err)
      }
    }
  }, [currentAuthUser])

  useEffect(() => {
    currentUserDoc &&
      setFormFields({
        displayName: currentUserDoc.displayName,
        bio: currentUserDoc.bio ? currentUserDoc.bio : '',
        location: currentUserDoc.location ? currentUserDoc.location : '',
        birthDate: '',
      })
  }, [currentUserDoc])

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }
  const onChangeHandler = (e) => {
    const { name } = e.target

    e.preventDefault()
    setFormFields({ ...formFields, [name]: e.target.value })
  }

  const modalCloseHandler = () => {
    if (modalIsOpen) {
      setModalIsOpen(false)
    } else return
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    updateUserProfile(currentAuthUser, formFields).then(() => {
      getUserDocFromAuth(currentAuthUser).then((res) => setCurrentUserDoc(res))
    })
    modalCloseHandler()
    resetFormFields()
  }

  const inputProfilePic = useRef(null)

  const inputProfilePicClickHandler = () => {
    inputProfilePic.current.click()
  }

  const inputProfilePicChangeHandler = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.addEventListener('load', () => setPhotoToBeCropped(reader.result))
      setModalType('photoCrop')
    }
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <div className='pb-10 relative'>
        <div className='flex py-3'>
          <div
            onClick={modalCloseHandler}
            className='hover:cursor-pointer text-center text-xl w-1/12 mt-1 ml-1'
          >
            <span className=' '>X</span>
          </div>
          <div className='w-10/12 text-center mt-1 text-xl'>
            <span className=''>
              <b>Edit Profile</b>
            </span>
          </div>
          <div className=' w-1/6 text-lg mr-2'>
            <Button type='submit' addedClasses='w-full mt-2'>
              Save
            </Button>
          </div>
        </div>
        <div className='relative '>
          <ProfileBannerImage />
          <MdCameraAlt
            className={`absolute bg-opacity-60 bg-gray-700 rounded-full text-6xl -mr-6 -mt-6 p-3 right-1/2 top-1/2 text-cyan-300 z-20 hover:cursor-pointer hover:bg-gray-600 hover:bg-opacity-60`}
          />
        </div>
        <div className='z-10 relative'>
          <div className=''>
            <ProfilePicBubble
              addedClasses='w-24 h-24 -mt-12'
              profilePic={currentUserDoc.profilePic}
            />
            <MdCameraAlt
              className={`absolute bg-opacity-60 bg-gray-700 rounded-full text-6xl -mt-7 ml-5 p-3 top-1/2 text-cyan-300 z-20 hover:cursor-pointer hover:bg-gray-600 hover:bg-opacity-60`}
              onClick={inputProfilePicClickHandler}
            />
            <input
              type='file'
              id='profilePic'
              ref={inputProfilePic}
              accept='.png, .jpg, .jpeg'
              className='hidden'
              onChange={inputProfilePicChangeHandler}
            />
          </div>
        </div>
        <FormInput
          label='Name'
          name='displayName'
          value={formFields.displayName}
          onChange={onChangeHandler}
        />
        <FormInput label='Bio' name='bio' value={formFields.bio} onChange={onChangeHandler} />
        <FormInput
          label='Location'
          name='location'
          value={formFields.location}
          onChange={onChangeHandler}
        />
      </div>
    </form>
  )
}

export default EditProfileForm
