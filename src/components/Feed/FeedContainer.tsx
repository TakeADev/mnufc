function FeedContainer({ children }) {
  return (
    <div className='flex w-full min-h-screen'>
      <div className='lg:w-3/5 max-w-3xl mx-auto border-slate-700 w-full'>{children}</div>
    </div>
  )
}

export default FeedContainer
