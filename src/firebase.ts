import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const addFieldsToCollection = async (collectionName: string, data: any) => {
  try {
    console.log("Writin record");
    const docRef = await addDoc(collection(db, "users"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default app;