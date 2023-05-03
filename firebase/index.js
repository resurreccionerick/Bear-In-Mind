// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA36hGYLKtwspptkhfL3WNoG5OR4D-8kto",
  authDomain: "note-taking-app-react-native.firebaseapp.com",
  projectId: "note-taking-app-react-native",
  storageBucket: "note-taking-app-react-native.appspot.com",
  messagingSenderId: "1040064601633",
  appId: "1:1040064601633:web:f1d798e5bd5ef0a6cacd60",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
};
