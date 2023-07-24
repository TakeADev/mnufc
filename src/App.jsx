import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './pages/Home/Home'
import FeedPage from './pages/FeedPage/FeedPage'

function App() {
  return (<BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/feed' element={<FeedPage />} />
    </Routes>
  </BrowserRouter>
  )}

export default App
