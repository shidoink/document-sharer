
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getStorage} from 'firebase/storage'

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
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app)