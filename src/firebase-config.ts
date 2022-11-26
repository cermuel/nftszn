import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8gF4QOThdIqAO7B95-N4O-1q60Kl8mqQ",
  authDomain: "nft-szn.firebaseapp.com",
  projectId: "nft-szn",
  storageBucket: "nft-szn.appspot.com",
  messagingSenderId: "980870875080",
  appId: "1:980870875080:web:a4af8843d1c00b4442e2fd",
  measurementId: "G-EYYRSRZVS1",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
