import { FunctionComponent, ReactNode } from 'react'

interface IButtonProps {
  type: 'button' | 'submit' | 'reset'
  addedClasses?: String
  onClick?: () => void
  children: ReactNode
}

const Button: FunctionComponent<IButtonProps> = ({ type, addedClasses, onClick, children }) => {
  return (
    <button type={type} className={`rounded-full ` + addedClasses} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
