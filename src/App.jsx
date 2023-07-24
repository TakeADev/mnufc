import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Welcome from './routes/Welcome'
import Home from './routes/Home'
import Navigation from './routes/Navigation'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='welcome' element={<Welcome />} />
      </Route>
    </Routes>
  )}

export default App