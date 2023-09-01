import { useContext, useEffect } from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import './App.css'
import Welcome from './routes/Welcome'
import Home from './routes/Home'
import Navigation from './routes/Navigation'
import Login from './routes/Login'
import Profile from './routes/Profile'
import SignUp from './routes/SignUp'

import { onAuthStateChangedListener, onUserPostsSnapshotListener } from './utils/firebase/firebase-config'
import { UserContext } from './contexts/User'
import { UserPostsContext } from './contexts/UserPosts'

function App() {
  const { setCurrentUser, currentUser } = useContext(UserContext)
  const { setUserPosts } = useContext(UserPostsContext)

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    const unsubscribe = onUserPostsSnapshotListener((snapshot) => {
      const posts = []
      snapshot.forEach((doc) => {
        posts.push(doc.data())
      })
      const postsSorted = posts.sort((a, b) => {
        return new Date(a.timestamp) - new Date(b.timestamp)
      })
      setUserPosts(postsSorted.reverse())
    })
    return unsubscribe
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={currentUser ? <Home /> : <Navigate to='welcome' replace />} />
        <Route path='welcome' element={currentUser ? <Navigate to='/' replace /> : <Welcome />} />
        <Route path='login' element={currentUser ? <Navigate to='/' replace /> : <Login />} />
        <Route path='signup' element={currentUser ? <Navigate to='/' replace /> : <SignUp />} />
        <Route path='profile/:username' element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App
