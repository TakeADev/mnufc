import { Dispatch, SetStateAction, createContext, useState } from 'react'

interface ICropperContext {
  photoToBeCropped: string
  setPhotoToBeCropped: Dispatch<SetStateAction<string | ArrayBuffer>>
  photoType: string
  setPhotoType: Dispatch<SetStateAction<string>>
}

export const CropperContext = createContext<ICropperContext>({
  photoToBeCropped: null,
  setPhotoToBeCropped: () => {},
  photoType: null,
  setPhotoType: () => {},
})

export const PHOTO_TYPES = {
  profilePic: 'profilePic',
  bannerPic: 'bannerPic',
}

function CropperProvider({ children }) {
  const [photoToBeCropped, setPhotoToBeCropped] = useState(null)
  const [photoType, setPhotoType] = useState(null)

  const value = {
    photoToBeCropped,
    setPhotoToBeCropped,
    photoType,
    setPhotoType,
  }

  return <CropperContext.Provider value={value}>{children}</CropperContext.Provider>
}

export default CropperProvider
