import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

class Firebase {
  constructor() {
    /* app.initializeApp(firebaseConfig);*/
    this.db = app.database();
    this.auth = app.auth();
  }
  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  snps = () => this.db.ref("Cognitive");
  blogs = () => this.db.ref("demo");
}

export default Firebase;
