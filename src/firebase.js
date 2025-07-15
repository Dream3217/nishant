// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Import Firestore

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCXWMXpQ09j4TMuAj2__CuNINVYcZ1pHK8",
  authDomain: "my-project-auth-6e2e8.firebaseapp.com",
  projectId: "my-project-auth-6e2e8",
  storageBucket: "my-project-auth-6e2e8.appspot.com",
  messagingSenderId: "682961187285",
  appId: "1:682961187285:web:f7a41d2d854850387c0d5c",
  measurementId: "G-DRT4CRTM15",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ✅ Export everything
export {
  app,
  auth,
  db, // ✅ Firestore database
  provider,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
};

