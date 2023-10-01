import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import UserProvider from './contexts/User.jsx'
import UserPostsProvider from './contexts/UserPosts.jsx'
import FeedProvider from './contexts/FeedContext.jsx'
import MenuProvider from './contexts/MenuContext.jsx'
import ModalProvider from './contexts/ModalContext.jsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <MenuProvider>
          <FeedProvider>
            <UserPostsProvider>
              <ModalProvider>
                <App />
              </ModalProvider>
            </UserPostsProvider>
          </FeedProvider>
        </MenuProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)
