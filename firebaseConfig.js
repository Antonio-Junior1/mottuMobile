import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUJylTR4SoE4w7-Xji1ntjFxaBOplx5YA",
  authDomain: "listatarefasplus-4e422.firebaseapp.com",
  projectId: "listatarefasplus-4e422",
  storageBucket: "listatarefasplus-4e422.firebasestorage.app",
  messagingSenderId: "905214128527",
  appId: "1:905214128527:web:73ed931f3aab3551b49bfa",
  measurementId: "G-XEG23YYXLG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

export { app, auth, db };

