// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_VY47ya7mL2DmOt5Z1MMYHEWfKMQGiAk",
  authDomain: "boardgamessophens.firebaseapp.com",
  projectId: "boardgamessophens",
  storageBucket: "boardgamessophens.appspot.com",
  messagingSenderId: "235141425174",
  appId: "1:235141425174:web:b18af42e91c2037003ad37",
  measurementId: "G-GFDQR1MQM1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);