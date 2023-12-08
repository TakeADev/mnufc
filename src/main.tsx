import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import UserProvider from './contexts/User.tsx'
import UserPostsProvider from './contexts/UserPosts.tsx'
import FeedProvider from './contexts/FeedContext.tsx'
import MenuProvider from './contexts/MenuContext.tsx'
import ModalProvider from './contexts/ModalContext.tsx'
import PostMenuProvider from './contexts/PostMenuContext.tsx'
import CropperProvider from './contexts/CropperContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <MenuProvider>
          <FeedProvider>
            <UserPostsProvider>
              <PostMenuProvider>
                <ModalProvider>
                  <CropperProvider>
                    <App />
                  </CropperProvider>
                </ModalProvider>
              </PostMenuProvider>
            </UserPostsProvider>
          </FeedProvider>
        </MenuProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)
