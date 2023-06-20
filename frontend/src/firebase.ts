import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getFirestore, collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";

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

export const createDataForNewUser = async (collectionName: string, newUserData: any, user: User|null) => {
  try {
    const usersCollection = collection(db, 'users');
    const userDocRef = doc(usersCollection, user?.uid);
    await setDoc(userDocRef, {...newUserData});
    console.log('Document successfully written!');
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const updateDataForUser = async (newUserData: any, user: User|null) => {
  try {
    const usersCollection = collection(db, 'users');
    const userDocRef = doc(usersCollection, user?.uid);
    await setDoc(userDocRef, {...newUserData});
    console.log('Document successfully updated!');
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const getDateForUser = async (user: User|null) => {
  try {
    const usersCollection = collection(db, 'users');
    const docRef = doc(usersCollection, user?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    }
    console.log("No such document!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export default app;