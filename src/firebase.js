// src/firebase.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚠️ Garde ta config telle quelle (les clés Web Firebase ne sont pas secrètes)
const firebaseConfig = {
  apiKey: "AIzaSyDP36Tnnrl5Lu84k5j9THrSX8WRHVbJf00",
  authDomain: "projet1-319ec.firebaseapp.com",
  projectId: "projet1-319ec",
  storageBucket: "projet1-319ec.firebasestorage.app",
  messagingSenderId: "412775451790",
  appId: "1:412775451790:web:dc9ea4281fc2b11e61cddf",
  measurementId: "G-Y023B82EEQ" // inutile côté Expo, mais tu peux le laisser
};

// Init appli Firebase
const app = initializeApp(firebaseConfig);

// Auth avec persistance (Expo/React Native)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
