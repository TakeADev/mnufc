import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  query,
  collection,
  addDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  where,
  arrayUnion,
} from 'firebase/firestore'

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
      return userCredential
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
    const userSnap = await getDoc(userDocRef)
    return userSnap.data()
  } catch (err) {
    console.log(err)
  }
}

export const getUserDocFromUsername = async (username) => {
  const userQ = query(collection(db, 'users'), where('username', '==', username))
  const userSnap = await getDocs(userQ)
  try {
    let user = null
    userSnap.forEach((snap) => {
      if (snap.data().username === username) {
        user = snap.data()
      }
    })
    return user
  } catch (err) {
    console.log(err)
  }
}

export const updateUserProfile = async (user, info) => {
  const userRef = doc(db, 'users', user.uid)
  try {
    await updateDoc(userRef, {
      ...info,
    })
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

export const createUserPost = async (user, postContent, replyTo) => {
  const userDoc = await getUserDocFromAuth(user)
  const timestamp = new Date().toLocaleString()
  const findPostToReplyTo = () => getPostByPostId(replyTo)
  await addDoc(collection(db, 'userPosts'), {
    uid: userDoc.uid,
    replyTo: replyTo,
    content: postContent,
    timestamp: timestamp,
    username: userDoc.username,
    displayName: userDoc.displayName,
    likes: 0,
    replies: [],
  }).then((docRef) => {
    if (replyTo) {
      try {
        findPostToReplyTo().then((res) =>
          updateDoc(doc(db, 'userPosts', res.postId), {
            replies: arrayUnion({
              postId: docRef.id,
              uid: userDoc.uid,
              replyTo: replyTo,
              content: postContent,
              timestamp: timestamp,
              username: userDoc.username,
              displayName: userDoc.displayName,
              likes: 0,
              replies: {},
            }),
          })
        )
      } catch (err) {
        console.log(err)
      }
    }
    updateDoc(docRef, {
      postId: docRef.id,
    })
  })
}
