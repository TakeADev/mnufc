import { useContext, useEffect } from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import './App.css'
import Welcome from './routes/Welcome'
import Home from './routes/Home'
import Navigation from './routes/Navigation'
import Login from './routes/Login'
import Profile from './routes/Profile'
import SignUp from './routes/SignUp'
import PostPage from './components/Posts/PostPage'

import {
  onAuthStateChangedListener,
  onCurrentUserSnapshotListener,
  onUserPostsSnapshotListener,
} from './utils/firebase/firebase-config'
import { UserContext } from './contexts/User'
import { UserPostsContext } from './contexts/UserPosts'

function App() {
  const { setCurrentAuthUser, currentAuthUser, setCurrentUserDoc } = useContext(UserContext)
  const { setUserPosts } = useContext(UserPostsContext)

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setCurrentAuthUser(user)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    const unsubscribe = onCurrentUserSnapshotListener((snapshot) => {
      setCurrentUserDoc(snapshot.data())
    })
    return unsubscribe
  }, [currentAuthUser])

  useEffect(() => {
    const unsubscribe = onUserPostsSnapshotListener((snapshot) => {
      const posts = []
      snapshot.forEach((doc) => {
        posts.push(doc.data())
      })
      const postsSorted = posts.sort((a, b) => {
        return new Date(a.timestamp).valueOf() - new Date(b.timestamp).valueOf()
      })
      setUserPosts(postsSorted.reverse())
    })
    return unsubscribe
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={currentAuthUser ? <Home /> : <Navigate to='welcome' replace />} />
        <Route
          path='welcome'
          element={currentAuthUser ? <Navigate to='/' replace /> : <Welcome />}
        />
        <Route path='login' element={currentAuthUser ? <Navigate to='/' replace /> : <Login />} />
        <Route path='signup' element={currentAuthUser ? <Navigate to='/' replace /> : <SignUp />} />
        <Route path=':username' element={<Profile />} />
        <Route path=':username/status/:postId' element={<PostPage />} />
      </Route>
    </Routes>
  )
}

export default App
