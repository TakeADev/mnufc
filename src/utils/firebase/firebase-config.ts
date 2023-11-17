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
  increment,
  deleteDoc,
  arrayRemove,
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
    likedPosts: [],
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
      alert(errorCode + errorMessage)
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

export const onCurrentUserSnapshotListener = (callback) => {
  if (auth.currentUser) {
    const currentUserRef = doc(db, 'users', auth.currentUser.uid)
    onSnapshot(currentUserRef, callback)
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

export const onUserPostsSnapshotListener = (callback) => {
  return onSnapshot(userPostsQuery, callback)
}

export const getPostByPostId = async (postId) => {
  const postRef = doc(db, 'userPosts', postId)
  const postSnap = await getDoc(postRef)

  if (postSnap.exists()) {
    return postSnap.data()
  } else {
    console.log('Post does not exist.')
  }
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
            replies: arrayUnion(docRef.id),
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

export const deleteUserPost = async (post) => {
  const authUserId = auth.currentUser.uid
  const postRef = doc(db, 'userPosts', post.postId)
  if (authUserId === post.uid) {
    if (post.replyTo) {
      const originalPostRef = doc(db, 'userPosts', post.replyTo)

      try {
        await updateDoc(originalPostRef, { replies: arrayRemove(post.postId) })
        await deleteDoc(postRef)
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        deleteDoc(postRef)
      } catch (err) {
        console.log(err)
      }
    }
  } else {
    alert(`You don't have permission to delete this post`)
  }
}

export const togglePostLike = async (post) => {
  const postRef = doc(db, 'userPosts', post.postId)
  const user = await getUserDocFromUid(auth.currentUser.uid)

  const userRef = doc(db, 'users', user.uid)
  try {
    if (user.likedPosts && user.likedPosts.find((likedPost) => likedPost == post.postId)) {
      updateDoc(postRef, {
        likes: increment(-1),
      })
      updateDoc(userRef, {
        likedPosts: user.likedPosts.filter((filteredPost) => filteredPost !== post.postId),
      })
    } else {
      updateDoc(userRef, {
        likedPosts: arrayUnion(post.postId),
      })
      updateDoc(postRef, {
        likes: increment(1),
      })
    }
  } catch (err) {
    console.log(err)
  }
}
