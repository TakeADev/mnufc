import { useContext, useEffect } from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import './App.css'
import Welcome from './routes/Welcome'
import Home from './routes/Home'
import Navigation from './routes/Navigation'
import Authentication from './routes/Authentication'
import Profile from './routes/Profile'

import { onAuthStateChangedListener } from './utils/firebase/firebase-config'
import { UserContext } from './contexts/User'

function App() {
  const { setCurrentUser, currentUser } = useContext(UserContext)

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user)
    })
    console.log(currentUser)
    return unsubscribe
  })

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={currentUser ? <Home /> : <Navigate to='auth' replace />} />
        <Route path='welcome' element={currentUser ? <Navigate to='/' replace /> : <Welcome />} />
        <Route path='auth' element={currentUser ? <Navigate to='/' replace /> : <Authentication />} />
        <Route path='profile' element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App
