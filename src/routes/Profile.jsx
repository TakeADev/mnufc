import React, { useContext } from 'react'
import { UserContext } from '../contexts/User'
import { useParams } from 'react-router-dom'

function Profile() {
  const currentUser = useContext(UserContext)
  const username = useParams().username
  console.log(username)
  return <div>Test</div>
}

export default Profile
