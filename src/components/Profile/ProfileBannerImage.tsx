function ProfileBannerImage({ user }) {
  return (
    <div className='border-l border-r border-b border-slate-700'>
      {user.bannerPic ? (
        <img src={user.bannerPic} />
      ) : (
        <img src='https://firebasestorage.googleapis.com/v0/b/mnufc-6f9e3.appspot.com/o/United%20Banner%20Image.jpg?alt=media&token=580815fc-050c-4fd4-b21a-a176debb7d81' />
      )}
    </div>
  )
}

export default ProfileBannerImage
