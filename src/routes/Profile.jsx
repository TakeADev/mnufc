import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { UserContext } from '../contexts/User'
import { MenuContext } from '../contexts/MenuContext'

function Profile() {
  const { setIsOpen } = useContext(MenuContext)

  useEffect(() => {
    setIsOpen(false)
  }, [])
  const currentUser = useContext(UserContext)
  const username = useParams().username
  console.log(username)
  return <div>Test</div>
}

export default Profile
