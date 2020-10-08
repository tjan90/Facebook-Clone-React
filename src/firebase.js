import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBH4-mdsi-DElmH8JNKMtcw8dGUFLouVvQ",
    authDomain: "facebook-clone-50527.firebaseapp.com",
    databaseURL: "https://facebook-clone-50527.firebaseio.com",
    projectId: "facebook-clone-50527",
    storageBucket: "facebook-clone-50527.appspot.com",
    messagingSenderId: "385669618760",
    appId: "1:385669618760:web:605edea08a22ad41210c7d"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const db = firebase.firestore()

export {auth, provider}
export default db