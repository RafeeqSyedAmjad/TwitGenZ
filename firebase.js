// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCBhWi-zI43yN87m33BoFZsR8cZkij-XYU",
    authDomain: "twitter-clone-d3fa4.firebaseapp.com",
    projectId: "twitter-clone-d3fa4",
    storageBucket: "twitter-clone-d3fa4.appspot.com",
    messagingSenderId: "34190456122",
    appId: "1:34190456122:web:6427f5e1e0fd3e06860c03"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };