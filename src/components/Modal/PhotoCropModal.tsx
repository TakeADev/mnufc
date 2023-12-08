import { useState, useCallback, useContext } from 'react'
import Cropper from 'react-easy-crop'

import Button from '../Button'

import { generateCroppedImage } from '../../utils/cropImage'

import { CropperContext } from '../../contexts/CropperContext'
import { MdArrowBack } from 'react-icons/md'
import { ModalContext } from '../../contexts/ModalContext'
import { UserContext } from '../../contexts/User'

const PhotoCropModal = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [finishedCrop, setFinishedCrop] = useState(null)

  const { photoToBeCropped, setPhotoToBeCropped } = useContext(CropperContext)
  const { setModalType } = useContext(ModalContext)
  const { currentUserDoc } = useContext(UserContext)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    croppedArea
    setFinishedCrop(croppedAreaPixels)
  }, [])

  const backButtonClickHandler = (e) => {
    e.preventDefault()
    setPhotoToBeCropped('')
    setModalType('editProfile')
  }

  const applyButtonClickHandler = () => {
    generateCroppedImage(photoToBeCropped, finishedCrop, currentUserDoc)
    setPhotoToBeCropped('')
    setModalType('editProfile')
  }

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
          aspect={3 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
    </>
  )
}

export default PhotoCropModal
