import * as firebase from 'firebase'

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBQvBrjPE2y55cg05Y1kTJMgp0SHQhWkYM",
    authDomain: "react-native-for-desgners.firebaseapp.com",
    databaseURL: "https://react-native-for-desgners.firebaseio.com",
    projectId: "react-native-for-desgners",
    storageBucket: "react-native-for-desgners.appspot.com",
    messagingSenderId: "208117910249",
    appId: "1:208117910249:web:c795cb2b888893672e3e78",
    measurementId: "G-V4X54PEPRP"
}

firebase.initializeApp(firebaseConfig)

export default firebase