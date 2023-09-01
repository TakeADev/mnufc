import React from 'react'

import { ReactComponent as Spinner } from '../assets/loading-spinner.svg'

function LoadingSpinner({ addedClasses }) {
  return (
    <div className={`w-1 mx-auto ${addedClasses}`}>
      <Spinner />
    </div>
  )
}

export default LoadingSpinner
