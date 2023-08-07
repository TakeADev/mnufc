import { useContext } from 'react'

import firebase from 'firebase/compat/app'
import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBEVSu6KdPg1-45MRNndbPOxpIu08GH5pA',
  authDomain: 'mnufc-6f9e3.firebaseapp.com',
  projectId: 'mnufc-6f9e3',
  storageBucket: 'mnufc-6f9e3.appspot.com',
  messagingSenderId: '894858335699',
  appId: '1:894858335699:web:c5fec932c71b53f7f5cb26',
}

const app = initializeApp(firebaseConfig)

const auth = getAuth()
const db = getFirestore(app)

export const createNewUserWithEmailAndPassword = async (email, password) => {
  createUserWithEmailAndPassword(auth, email, password).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message

    alert(errorCode + errorMessage)
  })
}

export const signInUserWithEmailAndPassword = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('User logged in ' + userCredential.user.email)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      alert(errorCode, errorMessage)
    })
}

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  if (!userAuth) return

  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      })
    } catch (err) {
      alert('Something went wrong' + err)
      console.log('error creating the user', err)
    }
  }
  return userDocRef
}

export const signOutUser = () => {
  signOut(auth)
}

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback)
}
