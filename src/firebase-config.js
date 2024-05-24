// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVIckisi7qdLU4ZRhTy6fKXvA7uTC9vKM",
  authDomain: "realtime-messaging-web-app.firebaseapp.com",
  projectId: "realtime-messaging-web-app",
  storageBucket: "realtime-messaging-web-app.appspot.com",
  messagingSenderId: "426256333472",
  appId: "1:426256333472:web:0af342cfa1ece5ffc7a7c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();