import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC_VY47ya7mL2DmOt5Z1MMYHEWfKMQGiAk",
  authDomain: "boardgamessophens.firebaseapp.com",
  projectId: "boardgamessophens",
  storageBucket: "boardgamessophens.appspot.com",
  messagingSenderId: "235141425174",
  appId: "1:235141425174:web:b18af42e91c2037003ad37",
  measurementId: "G-GFDQR1MQM1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
