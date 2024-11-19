import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-c5gPbGjvJsd6HrFYTw2t6pdopqwj0f4",
  authDomain: "examregistrationapp.firebaseapp.com",
  projectId: "examregistrationapp",
  storageBucket: "examregistrationapp.firebasestorage.app",
  messagingSenderId: "85696868705",
  appId: "1:85696868705:web:271e39306982634b1b9520"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };