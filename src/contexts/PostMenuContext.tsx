import { useState, createContext, Dispatch, SetStateAction } from 'react'
import { IUserPost } from './UserPosts'

interface IPostMenuContext {
  postMenuIsOpen: Boolean
  setPostMenuIsOpen: Dispatch<SetStateAction<Boolean>>
  postMenuPost: IUserPost | null
  setPostMenuPost: Dispatch<SetStateAction<IUserPost>>
}

export const PostMenuContext = createContext<IPostMenuContext>({
  postMenuIsOpen: false,
  setPostMenuIsOpen: () => {},
  postMenuPost: null,
  setPostMenuPost: () => {},
})

function PostMenuProvider({ children }) {
  const [postMenuIsOpen, setPostMenuIsOpen] = useState(false)
  const [postMenuPost, setPostMenuPost] = useState(null)

  const value = {
    postMenuIsOpen,
    setPostMenuIsOpen,
    postMenuPost,
    setPostMenuPost,
  }

  return <PostMenuContext.Provider value={value}>{children}</PostMenuContext.Provider>
}

export default PostMenuProvider
