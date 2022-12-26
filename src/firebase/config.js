// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxMDrVMCB9zL15NyISTuhHDHhWZPc0gmU",
  authDomain: "curso-react-zm.firebaseapp.com",
  projectId: "curso-react-zm",
  storageBucket: "curso-react-zm.appspot.com",
  messagingSenderId: "635397978776",
  appId: "1:635397978776:web:ad8acafaad823456992eed"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

// Authentication
export const FirebaseAuth = getAuth( FirebaseApp );

//Database
export const FirebaseDB = getFirestore( FirebaseApp );