import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseUrl: "",
  storageBucket: "gs://queswer-40ad8.appspot.com/",
}

var firebaseConfig = {
  apiKey: "AIzaSyAymrB9DnlF-9dikzlGra76anqGjLQ1Pn4",
  authDomain: "queswer-40ad8.firebaseapp.com",
  databaseURL: "https://queswer-40ad8.firebaseio.com",
  projectId: "queswer-40ad8",
  storageBucket: "queswer-40ad8.appspot.com",
  messagingSenderId: "549539160850",
  appId: "1:549539160850:web:c6822f164edf92e651c9cb",
  measurementId: "G-JHW92Q1ZMW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const firebaseStorage = firebase.storage()

export {
  firebaseStorage, firebase as default
} 