// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAG5nE0qeoDTWFvwdymFUGdClKByMp_ddI",
  authDomain: "todolist-63b17.firebaseapp.com",
  projectId: "todolist-63b17",
  storageBucket: "todolist-63b17.appspot.com",
  messagingSenderId: "345765017298",
  appId: "1:345765017298:web:190a721211cd2d960bdf0b",
  measurementId: "G-7CM92Z9434",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);