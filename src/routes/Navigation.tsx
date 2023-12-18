import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Modal from '../components/Modal/Modal'
import FlashMessage from '../components/FlashMessage/FlashMessage'

function Navigation() {
  return (
    <>
      <FlashMessage />
      <Modal>
        <NavBar />
        <Outlet />
      </Modal>
    </>
  )
}

export default Navigation
