import firebase from "firebase/compat/app";
//auth
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvxawYY7XTxmPjE-fQ7jTOZhGDxNAi8WA",
  authDomain: "clone-fbe61.firebaseapp.com",
  projectId: "clone-fbe61",
  storageBucket: "clone-fbe61.firebasestorage.app",
  messagingSenderId: "250385145229",
  appId: "1:250385145229:web:d7ef684e0175b8e9c371c4",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore()
