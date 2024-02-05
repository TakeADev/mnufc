import { FunctionComponent } from 'react'

interface IPostContentProps {
  content: String
  addedClasses?: String
}
const PostContent: FunctionComponent<IPostContentProps> = ({ content, addedClasses }) => {
  return (
    <div
      id='content-container'
      className={`mt-3 mb-5 ${addedClasses} z-20 cursor-text break-words`}
    >
      <span>{content}</span>
    </div>
  )
}

export default PostContent
