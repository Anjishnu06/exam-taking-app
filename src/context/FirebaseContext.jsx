// src/context/FirebaseContext.js
import React, { createContext, useContext } from "react";
import { db } from "../firebase";  // Ensure you have firebase.js configured with your Firebase project credentials
import { collection, addDoc } from "firebase/firestore";

// Create a FirebaseContext
const FirebaseContext = createContext();

// Custom hook to use FirebaseContext
export const useFirebase = () => {
  return useContext(FirebaseContext);
};

// FirebaseProvider component
export const FirebaseProvider = ({ children }) => {
  const usersCollectionRef = collection(db, "users");

  // Function to add user data to Firestore
  const addUser = async (userData) => {
    try {
      await addDoc(usersCollectionRef, userData);
      console.log("User data added successfully");
    } catch (error) {
      console.error("Error adding user data: ", error);
    }
  };

  return (
    <FirebaseContext.Provider value={{ addUser }}>
      {children}
    </FirebaseContext.Provider>
  );
};
