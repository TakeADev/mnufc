import { useState, useCallback, useContext, useEffect } from 'react'
import Cropper from 'react-easy-crop'

import { generateCroppedImage } from '../../utils/cropImage'

import { CropperContext } from '../../contexts/CropperContext'
import { MdArrowBack } from 'react-icons/md'
import { ModalContext } from '../../contexts/ModalContext'
import { UserContext } from '../../contexts/User'

import Button from '../Button'

import { MODAL_TYPES } from '../../contexts/ModalContext'
import { uploadUserPhoto } from '../../utils/firebase/firebase-config'
const { editProfile } = MODAL_TYPES

const PhotoCropModal = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [finishedCrop, setFinishedCrop] = useState(null)
  const [aspect, setAspect] = useState(null)

  const { photoToBeCropped, setPhotoToBeCropped, photoType } = useContext(CropperContext)
  const { setModalType } = useContext(ModalContext)
  const { currentUserDoc } = useContext(UserContext)

  //Takes crop values when user moves crop section
  const onCropComplete = useCallback((croppedArea: Object, croppedAreaPixels: Object) => {
    croppedArea
    setFinishedCrop(croppedAreaPixels)
  }, [])

  const backButtonClickHandler = (e: React.MouseEvent) => {
    e.preventDefault()

    setPhotoToBeCropped(null)
    setModalType(editProfile)
  }

  const applyButtonClickHandler = () => {
    //Takes cropped image, saves to cloud, stores to userdoc
    generateCroppedImage(photoToBeCropped.toString(), finishedCrop, currentUserDoc, photoType)

    setPhotoToBeCropped(null)
    setModalType(editProfile)
  }

  //Sets aspect ratio based on photoType
  useEffect(() => {
    switch (photoType) {
      case 'profilePic':
        setAspect(3 / 3)
        break
      case 'bannerPic':
        setAspect(3 / 1)
        break
    }
  }, [photoType])

  return (
    <>
      <div className='flex'>
        <div
          className=' ml-3 w-8 mt-3 rounded-full hover:cursor-pointer hover:bg-slate-800'
          onClick={backButtonClickHandler}
        >
          <div className='p-1'>
            <MdArrowBack className='w-full h-full' />
          </div>
        </div>
        <div className='ml-auto mt-3 mr-10 text-xl'>
          <Button
            type='button'
            addedClasses={
              'px-2 pb-1 bg-slate-950 text-white border border-white hover:bg-slate-800 text-lg'
            }
            onClick={applyButtonClickHandler}
          >
            Apply
          </Button>
        </div>
      </div>
      <div className='min-h-[50vh] '>
        <Cropper
          classes={{ containerClassName: 'mt-14' }}
          image={photoToBeCropped}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
    </>
  )
}

export default PhotoCropModal
