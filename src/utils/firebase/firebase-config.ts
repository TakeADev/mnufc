import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  User,
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
  deleteDoc,
  arrayRemove,
  DocumentSnapshot,
  QuerySnapshot,
} from 'firebase/firestore'

import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from 'firebase/storage'

import { IUserPost, IUserRepost } from '../../contexts/UserPosts'
import { IUserDoc } from '../../contexts/User'
import { IEditProfileFormFields } from '../../components/Forms/EditProfileForm'

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
const storage = getStorage(app)

//------------------------USERS/AUTH-----------------------------------------------------

export const onAuthStateChangedListener = (callback: (user: User) => void) => {
  onAuthStateChanged(auth, callback)
}

export const createNewUserWithEmailAndPassword = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message

    alert(errorCode + errorMessage)
  })
}

export const createUserDocumentFromAuth = async (
  userAuth: any,
  additionalInfo: { username: string }
) => {
  const userDocRef = doc(db, 'users', userAuth.user.uid)
  const createdAt = new Date()

  setDoc(userDocRef, {
    bio: '',
    birthDate: '',
    createdAt: createdAt,
    displayName: additionalInfo.username,
    email: userAuth.user.email,
    likedPosts: [],
    location: '',
    profilePic:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQicasXh3n4zKZPXpmQeWl1p2oXJJuaaRkskbnjOPaZ7SiM3CqvMJpp5WPwYBsxB3aW-eA&usqp=CAU',
    reposts: [],
    uid: userAuth.user.uid,
    username: additionalInfo.username.toLowerCase(),
  })
}

export const signInUserWithEmailAndPassword = async (email: string, password: string) => {
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

export const getUserDocFromAuth = async (user: User) => {
  const { uid } = user
  const userDocRef = doc(db, 'users', uid)
  const userSnap = await getDoc(userDocRef)

  return userSnap.data()
}

export const getUserDocFromUid = async (uid: string) => {
  const userDocRef = doc(db, 'users', uid)
  try {
    const userSnap = await getDoc(userDocRef)
    return userSnap.data()
  } catch (err) {
    console.log(err)
  }
}

export const getUserDocFromUsername = async (username: string) => {
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

export const onCurrentUserSnapshotListener = (
  callback: (user: DocumentSnapshot<IUserDoc>) => void
) => {
  if (auth.currentUser) {
    const currentUserRef = doc(db, 'users', auth.currentUser.uid)
    onSnapshot(currentUserRef, callback)
  }
}

export const updateUserProfile = async (user: User, info: IEditProfileFormFields) => {
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

export const onUserPostsSnapshotListener = (callback: (snapshot: QuerySnapshot) => void) => {
  return onSnapshot(userPostsQuery, callback)
}

export const getPostByPostId = async (postId: string) => {
  const postRef = doc(db, 'userPosts', postId)
  const postSnap = await getDoc(postRef)

  if (postSnap.exists()) {
    return postSnap.data()
  } else {
    console.log('Post does not exist.')
  }
}

export const createUserPost = async (user: User, postContent: string, replyTo: string) => {
  const userDoc = await getUserDocFromAuth(user)
  const timestamp = Date.now()
  const findPostToReplyTo = () => getPostByPostId(replyTo)
  await addDoc(collection(db, 'userPosts'), {
    uid: userDoc.uid,
    replyTo: replyTo,
    content: postContent,
    timestamp: timestamp,
    username: userDoc.username,
    displayName: userDoc.displayName,
    likes: [],
    replies: [],
    reposts: [],
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

export const deleteUserPost = async (post: IUserPost) => {
  const postDoc = await getDoc(doc(db, 'userPosts', post.postId))

  if (postDoc.exists) {
    const replies = postDoc.data().replies || []

    for (const replyId of replies) {
      await getDoc(doc(db, 'userPosts', replyId)).then((res: DocumentSnapshot<IUserPost>) => {
        deleteUserPost(res.data())
      })
    }

    const reposts = postDoc.data().reposts || []

    for (const userId of reposts) {
      const userDoc = await getDoc(doc(db, 'users', userId))

      if (userDoc) {
        await updateDoc(doc(db, 'users', userId), {
          reposts: userDoc.data().reposts.filter((repost: IUserRepost) => {
            repost.postId !== postDoc.data().postId
          }),
        })
      }
    }

    await deleteDoc(doc(db, 'userPosts', post.postId))

    if (postDoc.data().replyTo) {
      await getDoc(doc(db, 'userPosts', postDoc.data().replyTo)).then((res) => {
        updateDoc(doc(db, 'userPosts', postDoc.data().replyTo), {
          replies: res.data().replies.filter((replyId: string) => {
            replyId !== postDoc.data().postId
          }),
        })
      })
    }
  }
}

export const togglePostLike = async (post: IUserPost) => {
  const postDoc = await getDoc(doc(db, 'userPosts', post.postId))
  const user = await getUserDocFromUid(auth.currentUser.uid)

  const userRef = doc(db, 'users', user.uid)
  try {
    if (
      user.likedPosts &&
      user.likedPosts.find((likedPostId: string) => likedPostId == post.postId)
    ) {
      updateDoc(doc(db, 'userPosts', postDoc.data().postId), {
        likes: postDoc.data().likes.filter((likeUserId: string) => likeUserId !== user.uid),
      })
      updateDoc(userRef, {
        likedPosts: user.likedPosts.filter((likedPostId: string) => likedPostId !== post.postId),
      })
    } else {
      updateDoc(userRef, {
        likedPosts: arrayUnion(post.postId),
      })
      updateDoc(doc(db, 'userPosts', postDoc.data().postId), {
        likes: arrayUnion(user.uid),
      })
    }
  } catch (err) {
    console.log(err)
  }
}

export const toggleRepost = async (repostPost: IUserPost) => {
  const repostPostRef = doc(db, 'userPosts', repostPost.postId)
  const currentUserId = auth.currentUser.uid
  const currentUserRef = doc(db, 'users', currentUserId)

  const repostPostDoc = await getDoc(repostPostRef).then((res) => res.data())
  const currentUserDoc = await getDoc(currentUserRef).then((res) => res.data())
  const timestamp = Date.now()

  try {
    if (
      repostPostDoc.reposts &&
      currentUserDoc.reposts.find((post: IUserPost) => post.postId === repostPost.postId)
    ) {
      updateDoc(repostPostRef, { reposts: arrayRemove(currentUserId) })
      updateDoc(currentUserRef, {
        reposts: currentUserDoc.reposts.filter(
          (repost: IUserRepost) => repost.postId !== repostPost.postId
        ),
      })
      return
    }
    updateDoc(repostPostRef, { reposts: arrayUnion(currentUserId) })
    updateDoc(currentUserRef, {
      reposts: arrayUnion({ postId: repostPost.postId, timestamp: timestamp }),
    })
  } catch (err) {
    console.log(err)
  }
}

//-----------------------------STORAGE--------------------------------------

export const uploadUserPhoto = (imgSrc: any, currentUserDoc: IUserDoc) => {
  const uploadRef = ref(storage, currentUserDoc.username + '/uploads/' + Date.now())

  uploadString(uploadRef, imgSrc, 'data_url').then(() => {
    getDownloadURL(uploadRef).then((res) => {
      updateDoc(doc(db, 'users', currentUserDoc.uid.toString()), { photos: arrayUnion(res) })
    })
  })
}

export const uploadProfilePicture = (blob: Blob, currentUserDoc: IUserDoc) => {
  const pfpRef = ref(storage, currentUserDoc.username + `/profilePics/pfp-` + Date.now())

  uploadBytes(pfpRef, blob).then(() => {
    getDownloadURL(pfpRef).then((res) => {
      updateDoc(doc(db, 'users', currentUserDoc.uid.toString()), { profilePic: res })
    })
  })
}

export const uploadBannerPicture = (blob: Blob, currentUserDoc: IUserDoc) => {
  const bannerRef = ref(storage, currentUserDoc.username + `/bannerPics/bnr-` + Date.now())

  uploadBytes(bannerRef, blob).then(() => {
    getDownloadURL(bannerRef).then((res) => {
      updateDoc(doc(db, 'users', currentUserDoc.uid.toString()), { bannerPic: res })
    })
  })
}
