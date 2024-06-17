// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "shibaji-website.firebaseapp.com",
  projectId: "shibaji-website",
  storageBucket: "shibaji-website.appspot.com",
  messagingSenderId: "257608872073",
  appId: "1:257608872073:web:b736ff66beb7f91e499658",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
