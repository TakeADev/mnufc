import { FunctionComponent } from 'react'
import { ReactComponent as Spinner } from '../assets/loading-spinner.svg'

interface ILoadingSpinnerProps {
  addedClasses: string
}

const LoadingSpinner: FunctionComponent<ILoadingSpinnerProps> = ({ addedClasses }) => {
  return (
    <div className={`w-1 mx-auto ${addedClasses}`}>
      <Spinner />
    </div>
  )
}

export default LoadingSpinner
