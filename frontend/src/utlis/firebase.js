
import { initializeApp } from "firebase/app";

import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY, 
  authDomain: "fresher-ai-18645.firebaseapp.com",
  projectId: "fresher-ai-18645",
  storageBucket: "fresher-ai-18645.firebasestorage.app",
  messagingSenderId: "306683861072",
  appId: "1:306683861072:web:36b2bada367e3763a0d955"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
window.auth = auth; 

const provider = new GoogleAuthProvider()


export {auth,provider}