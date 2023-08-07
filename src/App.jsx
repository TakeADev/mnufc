import { useContext, useEffect } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Welcome from './routes/Welcome'
import Home from './routes/Home'
import Navigation from './routes/Navigation'
import Authentication from './routes/Authentication'
import Profile from './routes/Profile'

import { onAuthStateChangedListener, createUserDocumentFromAuth } from './utils/firebase/firebase-config'
import { UserContext } from './contexts/User'

function App() {
  const { setCurrentUser } = useContext(UserContext)
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      setCurrentUser(user)
    })

    return unsubscribe
  })

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='welcome' element={<Welcome />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='profile' element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App
