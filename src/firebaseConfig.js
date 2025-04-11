// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database , ref, push };
