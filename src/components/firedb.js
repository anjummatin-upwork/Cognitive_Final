import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCjki5q8v7qRNcqqUxmQCv1CsQ-GAjQWf4",
  authDomain: "cognitive-78143.firebaseapp.com",
  databaseURL: "https://cognitive-78143-default-rtdb.firebaseio.com",
  projectId: "cognitive-78143",
  storageBucket: "cognitive-78143.appspot.com",
  messagingSenderId: "49597652550",
  appId: "1:49597652550:web:e3a90c02150dbd404e3447",
  measurementId: "G-KC1HLY8BP6",
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var storage = firebase.storage();

export { storage, database as default };
