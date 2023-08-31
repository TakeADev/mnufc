import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDocs, query, collection, addDoc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore'

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

//------------------------USERS/AUTH-----------------------------------------------------

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback)
}

export const createNewUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message

    alert(errorCode + errorMessage)
  })
}

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  const userDocRef = doc(db, 'users', userAuth.user.uid)
  const createdAt = new Date()

  setDoc(userDocRef, {
    email: userAuth.user.email,
    username: additionalInfo.username,
    displayName: additionalInfo.username,
    createdAt: createdAt,
    uid: userAuth.user.uid,
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

export const signOutUser = () => {
  signOut(auth)
}

export const getUserDocFromAuth = async (user) => {
  const { uid } = user
  const userDocRef = doc(db, 'users', uid)
  const userSnap = await getDoc(userDocRef)

  return userSnap.data()
}

export const getUserDocFromUid = async (uid) => {
  const userDocRef = doc(db, 'users', uid)
  try {
    console.log('Trying to get user doc from uid...')
    const userSnap = await getDoc(userDocRef)
    console.log('User doc found: ' + userSnap.data().uid)
    return userSnap.data()
  } catch (err) {
    console.log(err)
  }
}

//-----------------------------USER POSTS--------------------------------------

const userPostsQuery = query(collection(db, 'userPosts'))
const postsSnapshot = await getDocs(userPostsQuery).catch((err) => console.log(err))

export const onUserPostsSnapshotListener = (callback) => {
  return onSnapshot(userPostsQuery, callback)
}

export const getUserPosts = async () => {
  const posts = []
  try {
    postsSnapshot.forEach((post) => {
      posts.push(post.data())
    })
  } catch (err) {
    console.log(err)
  }
  const postsSorted = posts.sort((a, b) => {
    return new Date(a.timestamp) - new Date(b.timestamp)
  })
  return postsSorted.reverse()
}

export const createUserPost = async (user, postContent) => {
  const userDoc = await getUserDocFromAuth(user)
  const timestamp = new Date().toLocaleString()
  await addDoc(collection(db, 'userPosts'), {
    uid: userDoc.uid,
    content: postContent,
    timestamp: timestamp,
    username: userDoc.username,
    displayName: userDoc.displayName,
    likes: 0,
  }).then((docRef) => {
    updateDoc(docRef, {
      postId: docRef.id,
    })
  })
}
