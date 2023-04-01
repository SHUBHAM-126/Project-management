import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDvZuCGHmq4AkFY_a2Wq-d5SHSYufsckYo",
    authDomain: "project-management-6afa2.firebaseapp.com",
    projectId: "project-management-6afa2",
    storageBucket: "project-management-6afa2.appspot.com",
    messagingSenderId: "854017949946",
    appId: "1:854017949946:web:a23eff8b229c298727c943"
  };

  //Init firbase
  firebase.initializeApp(firebaseConfig)

  //Init services
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()

  //timestamp
  const timestamp = firebase.firestore.Timestamp

export {projectFirestore, projectAuth, timestamp, projectStorage}