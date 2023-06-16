import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { get } from 'http';


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
// export const createUserWithEmailAndPassword = createUserWithEmailAndPassword;
// export const onAuthStateChanged = onAuthStateChanged;

// export const createUser = async(email, password) => {
//   const userCredential = await auth.createUserWithEmailAndPassword(email, password);
//   return userCredential;
// }

export default app;