// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-53a30.firebaseapp.com",
  projectId: "mern-estate-53a30",
  storageBucket: "mern-estate-53a30.appspot.com",
  messagingSenderId: "731696131773",
  appId: "1:731696131773:web:fe418fdcacf1229579d1d4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);