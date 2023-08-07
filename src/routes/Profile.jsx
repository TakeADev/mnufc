import React, { useContext } from 'react'
import { UserContext } from '../contexts/User'
import { getCurrentUserDoc } from '../utils/firebase/firebase-config'

function Profile() {
  const currentUser = useContext(UserContext)
  const userDocument = getCurrentUserDoc(currentUser)
  return <div>Test</div>
}

export default Profile
