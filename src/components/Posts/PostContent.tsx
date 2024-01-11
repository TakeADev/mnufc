import { FunctionComponent } from 'react'

interface IPostContentProps {
  content: String
  addedClasses?: String
}
const PostContent: FunctionComponent<IPostContentProps> = ({ content, addedClasses }) => {
  return (
    <div id='content-container' className={`mb-5 ${addedClasses} z-20 cursor-text break-all`}>
      <span>{content}</span>
    </div>
  )
}

export default PostContent
