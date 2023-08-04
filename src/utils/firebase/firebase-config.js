import { useContext } from 'react'

import firebase from 'firebase/compat/app'
import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getFirestore, collection, getDoc } from 'firebase/firestore'

import { UserContext } from '../../contexts/User'

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

export const createNewUserWithEmailAndPassword = (email, password, username) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message

      alert(errorCode + errorMessage)
    })
}
