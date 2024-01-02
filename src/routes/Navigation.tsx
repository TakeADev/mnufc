import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Modal from '../components/Modal/Modal'
import FlashMessage from '../components/FlashMessage/FlashMessage'

function Navigation() {
  const location = useLocation()
  return (
    <>
      <FlashMessage />
      <Modal>
        {location.pathname !== '/welcome' && <NavBar />}
        <Outlet />
      </Modal>
    </>
  )
}

export default Navigation
