import { useContext } from 'react'

import { useNavigate } from 'react-router-dom'

import { MdChat, MdFavorite, MdRepeat, MdClose } from 'react-icons/md'

import Button from '../Button'

import { ModalContext } from '../../contexts/ModalContext'

import { LOGIN_WARNING_TYPES } from '../../contexts/ModalContext'
const { comment, like, repost } = LOGIN_WARNING_TYPES

const LoginWarningModal = () => {
  const { setModalIsOpen, loginWarningType } = useContext(ModalContext)

  const navigate = useNavigate()

  return (
    <>
      <div
        className=' ml-3 w-10 mt-3 rounded-full hover:cursor-pointer hover:bg-slate-800'
        onClick={() => setModalIsOpen(false)}
      >
        <div className='p-1'>
          <MdClose className='text-3xl w-full h-full' />
        </div>
      </div>
      <div className='w-3/4 mx-auto'>
        <div className='mt-8 mb-10 text-center'>
          {loginWarningType === comment && (
            <div className=''>
              <MdChat className='w-full text-5xl mx-auto mb-4 text-cyan-400' />
              <div className='text-left mx-auto mt-10'>
                <span className='text-2xl font-bold'>Comment to join the conversation.</span>
              </div>
              <div className='text-left mx-auto mt-3'>
                <span className='text-slate-500'>
                  Join Minnesota United Fan Club to reply to this post.
                </span>
              </div>
            </div>
          )}
          {loginWarningType === like && (
            <div className=''>
              <MdFavorite className='w-full text-5xl mx-auto mb-4 text-red-400' />
              <div className='text-left mx-auto mt-10'>
                <span className='text-2xl font-bold'>Show some love.</span>
              </div>
              <div className='text-left mx-auto mt-3'>
                <span className='text-slate-500'>Join Minnesota United Fan Club to like post.</span>
              </div>
            </div>
          )}
          {loginWarningType === repost && (
            <div className=''>
              <MdRepeat className='w-full text-5xl mx-auto mb-4 text-green-400' />
              <div className='text-left mx-auto mt-10'>
                <span className='text-2xl font-bold'>Repost to share with others.</span>
              </div>
              <div className='text-left mx-auto mt-3'>
                <span className='text-slate-500'>
                  Join Minnesota United Fan Club to reply to this post.
                </span>
              </div>
            </div>
          )}
          <Button
            type='button'
            addedClasses='text-lg py-2 px-8 mt-10 bg-slate-950 hover:bg-slate-900 text-white border border-white w-full'
            onClick={() => {
              navigate('/login')
              setModalIsOpen(false)
            }}
          >
            Log in
          </Button>
          <Button
            type='button'
            addedClasses='text-lg py-2 px-8 mt-3 w-full hover:bg-cyan-500'
            onClick={() => {
              navigate('/login')
              setModalIsOpen(false)
            }}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </>
  )
}
export default LoginWarningModal
