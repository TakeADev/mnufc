import { FunctionComponent } from 'react'

interface IPostContentProps {
  content: String
  addedClasses?: String
}
const PostContent: FunctionComponent<IPostContentProps> = ({ content, addedClasses }) => {
  return (
    <div id='content-container' className={`ml-16 mb-5 ${addedClasses}`}>
      <span>{content}</span>
    </div>
  )
}

export default PostContent
