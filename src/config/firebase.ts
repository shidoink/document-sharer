// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJRqObrjhBUM9Lp05Knp1HsnoESjfGx48",
  authDomain: "document-sharer.firebaseapp.com",
  projectId: "document-sharer",
  storageBucket: "document-sharer.appspot.com",
  messagingSenderId: "190615052969",
  appId: "1:190615052969:web:37d89a898e04890e617fb8",
  measurementId: "G-MKC9YNVBZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = {google: new GoogleAuthProvider()};
export const storage = getStorage(app)