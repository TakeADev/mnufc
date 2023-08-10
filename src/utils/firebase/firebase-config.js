import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc, writeBatch, getDocs, query, collection } from 'firebase/firestore'

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
  return createUserWithEmailAndPassword(auth, email, password).catch((error) => {
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
  const userDocRef = doc(db, 'users', userAuth.user.uid)
  const createdAt = new Date()

  setDoc(userDocRef, {
    email: userAuth.user.email,
    displayName: additionalInfo.displayName,
    createdAt: createdAt,
  })
}

export const signOutUser = () => {
  signOut(auth)
}

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback)
}

const q = query(collection(db, 'userPosts'))
const postsSnapshot = await getDocs(q).catch((err) => console.log(err))

export const getUserPosts = () => {
  const posts = []
  postsSnapshot.forEach((post) => {
    posts.push(post.data())
  })
  return posts
}
