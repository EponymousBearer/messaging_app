// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJF6esjj2LKz1pL6KpyfWzJhnQA9Fypd4",
  authDomain: "realtime-messaging-app-3c8aa.firebaseapp.com",
  databaseURL: "https://realtime-messaging-app-3c8aa-default-rtdb.firebaseio.com",
  projectId: "realtime-messaging-app-3c8aa",
  storageBucket: "realtime-messaging-app-3c8aa.appspot.com",
  messagingSenderId: "785021600887",
  appId: "1:785021600887:web:91ab1db100f52f13067272",
  measurementId: "G-3K0VVMYVPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);