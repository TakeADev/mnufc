import React, { useContext } from 'react'
import { UserContext } from '../contexts/User'

function Profile() {
  const currentUser = useContext(UserContext)
  return <div>Test</div>
}

export default Profile
