function FeedContainer({ children }) {
  return (
    <div className='flex w-full'>
      <div className='lg:w-3/5 max-w-3xl mx-auto border-l border-r border-slate-700'>
        {children}
      </div>
    </div>
  )
}

export default FeedContainer
