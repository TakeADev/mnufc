import { FunctionComponent, ReactNode } from 'react'

import LoadingSpinner from '../LoadingSpinner'

interface IPostContainerProps {
  children: ReactNode
  isLoading: Boolean
  addedClasses?: string
}

const PostContainer: FunctionComponent<IPostContainerProps> = ({
  children,
  isLoading,
  addedClasses,
}) => {
  return (
    <>
      <div className='hidden'>{children}</div>
      <div id='post-holder' className={addedClasses}>
        {isLoading ? <LoadingSpinner addedClasses='my-10' /> : children}
      </div>
    </>
  )
}

export default PostContainer
