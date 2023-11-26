// fireabse
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIbc9CHVy2DshyuDFIoXrLpIoFAfPKI2I",
  authDomain: "employee-list-56dc5.firebaseapp.com",
  projectId: "employee-list-56dc5",
  storageBucket: "employee-list-56dc5.appspot.com",
  messagingSenderId: "371867464572",
  appId: "1:371867464572:web:dba7561545a153918baaf9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export default db 