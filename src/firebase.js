// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAuth } from "firebase/auth"; // Import Auth if needed

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE2NwpR0MOe0W5FZledbzCZLUzO6q6_Rk",
  authDomain: "todoapp-8599e.firebaseapp.com",
  projectId: "todoapp-8599e",
  storageBucket: "todoapp-8599e.appspot.com",
  messagingSenderId: "803209129949",
  appId: "1:803209129949:web:e421940bcad81d9b251034"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth (if needed)
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Auth

// Export the Firebase services you need
export { app, db, auth };
