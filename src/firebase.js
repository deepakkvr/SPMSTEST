import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔹 Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCoG6shpLgVQI3qtvDE1aFDM3eFdh7F0e0",
  authDomain: "first-chat-app-bbc0f.firebaseapp.com",
  databaseURL: "https://first-chat-app-bbc0f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "first-chat-app-bbc0f",
  storageBucket: "first-chat-app-bbc0f.firebasestorage.app",
  messagingSenderId: "36462053707",
  appId: "1:36462053707:web:a14fe9200afd5eaf3680ce",
  measurementId: "G-45T8L4GJY3"
};


// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);