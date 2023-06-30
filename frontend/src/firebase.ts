import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { 
  getFirestore, collection, deleteField,
  doc, setDoc, getDoc, updateDoc,
  query, where, getDocs, DocumentData, DocumentReference 
} from "firebase/firestore";
import { 
  getAuth, updateProfile, User 
} from "firebase/auth";
import { 
  getStorage, ref, uploadBytes, getDownloadURL 
} from "firebase/storage";
import { UserEnt } from './interfaces/UserEnt';

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
    const sourceUserDocRef = doc(followingCollection, user?.uid);
    const docSnap = await getDoc(sourceUserDocRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    console.log("No such document!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const getFollowingByUserId = async (userId:string) => {
  try {
    const sourceUserDocRef = doc(followingCollection, userId);
    const docSnap = await getDoc(sourceUserDocRef);
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
    const sourceUserDocRef = doc(followersCollection, user?.uid);
    const docSnap = await getDoc(sourceUserDocRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    console.log("No such document!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const getFollowersByUserId = async (userId:string) => {
  try {
    const sourceUserDocRef = doc(followersCollection, userId);
    const docSnap = await getDoc(sourceUserDocRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    console.log("No such document!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


/**
 * Source user is the user who is following the destination user
 * When source follows a destination user, the destination user is added to the source user's following list
 * and the source user is added to the destination user's followers list
 * @param user 
 * @param userToFollow 
 */
export const followUser = async (currentUserEnt: UserEnt, userToFollowEnt: UserEnt) => {
  try {
    if (!currentUserEnt.id || !userToFollowEnt.id) {
      throw new Error("One of the user IDs is invalid");
    }

    const userId = currentUserEnt.id;
    const userToFollowId = userToFollowEnt.id;

    const followingDocRefForPrimaryUser = doc(followingCollection, userId);
    const followersDocRefForSecondaryUser = doc(followersCollection, userToFollowId);
    // Add user to follow to current user's following list
    await updateFollowingForPrimaryUser(followingDocRefForPrimaryUser, userToFollowEnt.data);
    // Add current user to followed user's followers list
    await updateFollowersForSecondaryUser(followersDocRefForSecondaryUser, currentUserEnt);
    console.log("User followed successfully!");
  } catch (e) {
    console.error("Error following a user: ", e);
  }
}

export const followUserByUserId = async (userId: string|null|undefined, userIdToFollow: string|null|undefined) => {
  try {
    if (!userId || !userIdToFollow) {
      throw new Error("One of the user IDs is invalid");
    }

    const followingDocRefForPrimaryUser = doc(followingCollection, userId);
    const followersDocRefForSecondaryUser = doc(followersCollection, userIdToFollow);
    // Add user to follow to current user's following list
    await updateFollowingForPrimaryUser(followingDocRefForPrimaryUser, userIdToFollow);
    // Add current user to followed user's followers list
    await updateFollowersForSecondaryUser(followersDocRefForSecondaryUser, userId);
    console.log("User followed successfully!");
  } catch (e) {
    console.error("Error following a user: ", e);
  }
}

const updateFollowersForSecondaryUser = async (
  followersDocRef: DocumentReference<DocumentData>,
  userEnt: UserEnt | null
): Promise<void> => {
  try {
    const docSnap = await getDoc(followersDocRef);
    const followers = docSnap.data();
    const followerUserId = userEnt?.id;
    const followerUsername = userEnt?.data.username;
    const followerImageUrl = userEnt?.data.profileImageUrl || "";

    if (docSnap.exists()) {
      if (followerUserId) {
        const newFollowerObj = {
          [followerUserId]: {
            username: followerUsername,
            profileImageUrl: followerImageUrl,
          },
        };

        const newFollowersList = followers
          ? {
            ...followers,
            ...newFollowerObj,
          }
          : { ...newFollowerObj };

        await updateDoc(followersDocRef, newFollowersList);
      } else {
        throw new Error("Unable to add user to follower list: Invalid followerUserId");
      }
    } else { // Create a new document for the user
      if (followerUserId) {
        await setDoc(followersDocRef, {
          [followerUserId]: {
            username: followerUsername,
            profileImageUrl: followerImageUrl,
          },
        });
      } else {
        throw new Error("Unable to add user to follower list: Invalid followerUserId");
      }
    }
  } catch (error) {
    console.error("Error updating followers for secondary user:", error);
    throw error;
  }
};


const updateFollowingForPrimaryUser = async (
  followingDocRef: DocumentReference<DocumentData>, 
  destinationUserData: DocumentData | null
) => {
  const docSnap = await getDoc(followingDocRef)
  if (docSnap.exists()) {
    const following = docSnap.data();

    const userToFollowId = destinationUserData?.userId;
    const userToFollowUsername = destinationUserData?.username;
    const userToFollowImageUrl = destinationUserData?.profileImageUrl || "";

    if (userToFollowId) {
      const newUserToFollowObj = {
        [userToFollowId]: {
          username: userToFollowUsername,
          profileImageUrl: userToFollowImageUrl
        }
      };

      if (following) {
        const newFollowingList = {
          ...following,
          ...newUserToFollowObj
        };
        await updateDoc(followingDocRef, newFollowingList);
      } else {
        await setDoc(followingDocRef, { [destinationUserData?.userId]: destinationUserData?.username });
      }
    } else {
      throw new Error("Unable to add user to following list. Invalid userToFollowId");
    }
  } else {
    throw new Error("No such document!");
  }
}

export const unfollowUser = async (currentUserEnt: UserEnt, userToUnfollowEnt: UserEnt) => {
  try {
    if (!currentUserEnt.id || !userToUnfollowEnt.id) {
      throw new Error("One of the user IDs is invalid");
    }
    
    const userId = currentUserEnt.id;
    const userIdToUnfollowId = userToUnfollowEnt.id;
    
    const followersDocRefForSource = doc(followersCollection, userIdToUnfollowId);
    const followingDocRefForDestination = doc(followingCollection, userId);

    // Remove followed user from current user's following list to unfollow
    await removeFromFollowing(followingDocRefForDestination, userIdToUnfollowId);
    // Remove current user from unfollowed user's followers list as they unfollowed them
    await removeFromFollowers(followersDocRefForSource, currentUserEnt.id);

    console.log("Follower removed successfully!");
  } catch (e) {
    console.error("Error removing follower: ", e);
  }
}

export const unfollowUserByUserId = async (
  userId: string|null|undefined, userIdToUnfollow: string|null|undefined
  ) => {
  try {
    if (!userId || !userIdToUnfollow) {
      throw new Error("One of the user IDs is invalid");
    }
    
    const followersDocRefForSource = doc(followersCollection, userIdToUnfollow);
    const followingDocRefForDestination = doc(followingCollection, userId);

    // Remove followed user from current user's following list to unfollow
    await removeFromFollowing(followingDocRefForDestination, userIdToUnfollow);    
    // Remove current user from unfollowed user's followers list as they unfollowed them
    await removeFromFollowers(followersDocRefForSource, userId);

    console.log("Follower removed successfully!");
  } catch (e) {
    console.error("Error removing follower: ", e);
  }
}

const removeFromFollowing = async (
  followingDocRef: DocumentReference<DocumentData>,
  userIdToUnfollow: string|null|undefined
) => {
  const docSnap = await getDoc(followingDocRef);
  const following = docSnap.data();
  
  if (userIdToUnfollow) {
    if (docSnap.exists()) {
      if (following) {
        await updateDoc(followingDocRef, { [userIdToUnfollow]: deleteField() });
      } else {
        // Logically this block should never be executed
        console.log("The user doesn't follow anyone");
      }
    }
  } else {
    throw new Error("Unable to remove user from following list Invalid userToUnfollowId");
  }
}

const removeFromFollowers = async (
  followersDocRef: DocumentReference<DocumentData>,
  userIdToUnfollowId: string,
) => {
  const docSnap = await getDoc(followersDocRef);
  const followers = docSnap.data();

  if (userIdToUnfollowId) {
    if (docSnap.exists()) {
      if (followers) {
        await updateDoc(followersDocRef, { [userIdToUnfollowId]: deleteField() });
      } else {
        // Logically this block should never be executed 
        console.log("The user doesn't follow anyone");
      }
    }
  } else {
    throw new Error("Unable to remove user from follower list Invalid followerUserId");
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
    await updateDoc(userDocRef, {...newUserData});
    console.log('Document successfully written!');
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const setUserData = async (newUserData: any, user: User | null) => {
  try {
    const userDocRef = doc(usersCollection, user?.uid);
    await setDoc(userDocRef, { ...newUserData });
    console.log('Document successfully added!');
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const updateUserData = async (newUserData: any, user: User|null) => {
  try {
    const userDocRef = doc(usersCollection, user?.uid);
    await updateDoc(userDocRef, {...newUserData});
    console.log('Document successfully updated!');
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

export const getUserEntByUserId = async (userId: string): Promise<UserEnt | null> => {
  try {
    const usersDocRef = doc(db, "users", userId);
    const docSnap = await getDoc(usersDocRef);
    if (docSnap.exists()) {
      return {
        id: userId,
        data: docSnap.data()
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
}

export const getDataForUser = async (user: User|null) => {
  try {
    const sourceUserDocRef = doc(usersCollection, user?.uid);
    const docSnap = await getDoc(sourceUserDocRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    console.log("No such document!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const getDataForUserByCollectionId = async (collectionId: string|null|undefined) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("id", "==", collectionId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    }
    console.log("No such document!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const getDataForUserByUserId = async (userId: string) => {
  try {
    const usersDocRef = doc(db, "users", userId);
    const docSnap = await getDoc(usersDocRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const getDataForUserByUsername = async (username: string|null|undefined) => {
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

export const uploadProfileImage_DEPRECATED = async (file: File, user: User|null): Promise<string> => {
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

export const uploadProfileImage = async (file: File, user: User | null): Promise<string> => {
  const imageRef = ref(storage, `profile_images/${user?.uid}`);
  try {
    const snapshot = await uploadBytes(imageRef, file);
    const imageUrl = await getDownloadURL(snapshot.ref);
    if(user) {
      try {
        await updateProfile(user, {
          photoURL: imageUrl
        });
        console.log("Profile updated successfully");
      } catch (error) {
        throw new Error("Error updating profile");
      }
    }
    return imageUrl;
  } catch (e) {
    console.error("Error uploading image: ", e);
    return "";
  }
}

export const searchUsersIncrementallyByPartialUsername = async (searchTerm: string, ): Promise<UserEnt[]> => {
  try {
    console.log("Searching...", searchTerm);
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", ">=", searchTerm), where("username", "<=", searchTerm + '\uf8ff'));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          data: doc.data()
        }
      });
    }
    console.log("No such user document!");
    return [];
  } catch (e) {
    console.error("Error searching contributors ", e);
    return [];
  }
};

export default app;