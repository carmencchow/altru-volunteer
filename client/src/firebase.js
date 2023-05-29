// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoGAJdvdA5S1Rz9cL26ow4ta0n0z0Smb4",
  authDomain: "volunteer-app-b7b3b.firebaseapp.com",
  projectId: "volunteer-app-b7b3b",
  storageBucket: "volunteer-app-b7b3b.appspot.com",
  messagingSenderId: "647431694547",
  appId: "1:647431694547:web:7d11d4e7540735205fcc26",
  measurementId: "G-9MJQYDLFDF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
