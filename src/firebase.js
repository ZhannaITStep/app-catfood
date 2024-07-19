import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEfV-i-9XnA_Jd-0pFdzHUl4bAv9ZJ01o",
  authDomain: "react-app-catfood-95a52.firebaseapp.com",
  databaseURL: "https://react-app-catfood-95a52-default-rtdb.firebaseio.com",
  projectId: "react-app-catfood-95a52",
  storageBucket: "react-app-catfood-95a52.appspot.com",
  messagingSenderId: "1034334426282",
  appId: "1:1034334426282:web:2bce5db9736e1faf22acd3",
  measurementId: "G-MF5L5RPJ2C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only in browser environment
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Initialize Realtime Database
const database = getDatabase(app);

export { app, analytics, database };
