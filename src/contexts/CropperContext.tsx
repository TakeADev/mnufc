import { Dispatch, SetStateAction, createContext, useState } from 'react'

interface ICropperContext {
  photoToBeCropped: string
  setPhotoToBeCropped: Dispatch<SetStateAction<string>>
}

export const CropperContext = createContext<ICropperContext>({
  photoToBeCropped: null,
  setPhotoToBeCropped: () => {},
})

function CropperProvider({ children }) {
  const [photoToBeCropped, setPhotoToBeCropped] = useState(null)

  const value = {
    photoToBeCropped,
    setPhotoToBeCropped,
  }

  return <CropperContext.Provider value={value}>{children}</CropperContext.Provider>
}

export default CropperProvider
