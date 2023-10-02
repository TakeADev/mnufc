import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Modal from '../components/Modal/Modal'

function Navigation() {
  return (
    <>
      <Modal>
        <NavBar />
        <Outlet />
      </Modal>
    </>
  )
}

export default Navigation
