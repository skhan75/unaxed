import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { 
  getFirestore, collection, 
  doc, setDoc, getDoc, updateDoc, 
  query, where, getDocs 
} from "firebase/firestore";
import { 
  getAuth, User 
} from "firebase/auth";
import { 
  getStorage, ref, uploadBytes, getDownloadURL 
} from "firebase/storage";

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
const db = getFirestore(app);
const storage = getStorage(app);
const usersCollection = collection(db, 'users');
const followersCollection = collection(db, 'followers');
const followingCollection = collection(db, 'following');


export const getFollowing = async (user: User|null) => {
  try {
    const docRef = doc(followingCollection, user?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    console.log("No such document!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const getFollowers = async (user: User|null) => {
  try {
    const docRef = doc(followersCollection, user?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    console.log("No such document!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const checkUserNameAvailability = async (username: string): Promise<boolean> => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  } catch (error) {
    console.error("Error checking username availability:", error);
    return false;
  }
};

export const createDataForNewUser = async (collectionName: string, newUserData: any, user: User|null) => {
  try {
    const userDocRef = doc(usersCollection, user?.uid);
    await setDoc(userDocRef, {...newUserData});
    console.log('Document successfully written!');
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const setUserData = async (newUserData: any, user: User | null) => {
  try {
    console.log("Updating user data");
    const userDocRef = doc(usersCollection, user?.uid);
    await setDoc(userDocRef, { ...newUserData });
    console.log('Document successfully added!');
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const updateUserData = async (newUserData: any, user: User|null) => {
  try {
    console.log("Updating user data");
    const userDocRef = doc(usersCollection, user?.uid);
    await updateDoc(userDocRef, {...newUserData});
    console.log('Document successfully updated!');
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

export const getDataForUser = async (user: User|null) => {
  try {
    
    const docRef = doc(usersCollection, user?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    console.log("No such document!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const getDataForUserByUsername = async (username: string) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    }
    console.log("No such document!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const uploadProfileImage = async (file: File, user: User|null): Promise<string> => {
  const imageRef = ref(storage, `profile_images/${user?.uid}`);
  try {
    const snapshot = await uploadBytes(imageRef, file);
    console.log('Uploaded image successfully!');
    return await getDownloadURL(snapshot.ref);
  } catch (e) {
    console.error("Error uploading image: ", e);
    return "";
  }
}


export default app;