import "firebase/auth"
import "firebase/firestore"
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyD8DY5Tsg5wqb2Rbz_SnALKYzMxrosXOWQ",
  authDomain: "movie-memories.firebaseapp.com",
  databaseURL: "https://movie-memories.firebaseio.com",
  projectId: "movie-memories",
  storageBucket: "movie-memories.appspot.com",
  messagingSenderId: "44621222604",
  appId: "1:44621222604:web:ef77d4d36265e0fd07a869",
  measurementId: "G-EM2SB55104"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;