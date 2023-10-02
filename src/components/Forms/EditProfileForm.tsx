import { useEffect, useState, useContext } from 'react'

import { getUserDocFromAuth, updateUserProfile } from '../../utils/firebase/firebase-config'

import { UserContext } from '../../contexts/User.jsx'
import { ModalContext } from '../../contexts/ModalContext'

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
  const { modalIsOpen, setModalIsOpen } = useContext(ModalContext)

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

  return (
    <form onSubmit={onSubmitHandler}>
      <div className='flex pt-2 mb-2'>
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
      <ProfileBannerImage />
      <ProfilePicBubble addedClasses='w-24 h-24 -mt-12' />
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
    </form>
  )
}

export default EditProfileForm
