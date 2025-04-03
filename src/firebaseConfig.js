// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAh9FcD2XvfYxnyj1SSfQohlSajqeDPw7A",
  authDomain: "gokqmp.firebaseapp.com",
  databaseURL: "https://gokqmp-default-rtdb.firebaseio.com",
  projectId: "gokqmp",
  storageBucket: "gokqmp.appspot.com",
  messagingSenderId: "36775330040",
  appId: "1:36775330040:web:c1ef66bb6cf598485e3b0d",
  measurementId: "G-S6HP41R1XP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };