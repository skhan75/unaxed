import { initializeApp } from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';
import 'firebase/auth';
import { 
  getFirestore, collection, deleteField,
  doc, setDoc, getDoc, updateDoc,
  query, where, getDocs, DocumentData, DocumentReference, 
  orderBy, onSnapshot
} from "firebase/firestore";
import { 
  getAuth, updateProfile, User 
} from "firebase/auth";
import { 
  getStorage, ref, uploadBytes, getDownloadURL
} from "firebase/storage";
import { UserEnt } from './interfaces/UserEnt';
import { ProjectData, ProjectEnt } from './interfaces/ProjectEnt';

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
const storage = getStorage(app);
const usersCollection = collection(db, 'users');
const followersCollection = collection(db, 'followers');
const followingCollection = collection(db, 'following');
const projectsCollection = collection(db, 'projects');

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

export const updateUserDataWithUserId = async (updatedData: any, userId: string) => {
  try {
    const userDocRef = doc(usersCollection, userId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const projects = userData.projects || [];
      const updatedProjects = [...projects, ...updatedData.projects];
      await updateDoc(userDocRef, { projects: updatedProjects });
      console.log('Document successfully updated!');
    } else {
      console.log('User document does not exist!');
    }
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

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

export const uploadMediaForEntId = async (file: File, entID: string): Promise<{ mediaId: string, downloadUrl: string } | null> => {
  const mediaId =  __generateFixedUUID();
  const projectRef = ref(storage, `project_media/${entID}/${mediaId}`);
  try {
    const snapshot = await uploadBytes(projectRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    console.log('Uploaded image successfully!', projectRef.name);
    return { mediaId: mediaId, downloadUrl: downloadUrl };
  } catch (e) {
    console.error("Error uploading image: ", e);
    return null;
  }
}

export const createProject = async (projectData: ProjectData): Promise<string> => {
  try {
    const projectDocRef = doc(projectsCollection);
    const id = projectDocRef.id;
    const dataToAdd = { ...projectData, projectId: id };
    await setDoc(projectDocRef, dataToAdd);
    return id;
  } catch (e) {
    console.error("Error adding project - ", e);
    return "";
  }
}

export const addProject = async (projectData: ProjectData, viewedEntId: string): Promise<string> => {
  try {
    const projectDocRef = doc(projectsCollection);
    const id = projectDocRef.id;
    const dataToAdd = { ...projectData, projectId: id };
    // Create project
    await setDoc(projectDocRef, dataToAdd);

    console.log('Project added successfully!');
    const updatedData = {
      projects: [id]
    }
    await updateUserDataWithUserId(updatedData, viewedEntId);
    console.log("Project ID added to user's projects list for userId - ", viewedEntId);
    return id;
  } catch (e) {
    console.error("Error adding project - ", e);
    return "";
  }
}

export const addProjectForUser = async (projectId: string, userId: string): Promise<void> => {
  try {
    const userDocRef = doc(usersCollection, userId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const projects = userData.projects || [];
      const updatedProjects = [...projects, projectId];
      await updateDoc(userDocRef, { projects: updatedProjects });
      console.log('Document successfully updated!');
    } else {
      console.log('User document does not exist!');
    }
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

export const updateProject = async (projectId: string, projectData: ProjectData): Promise<string> => {
  try {
    const projectDocRef = doc(projectsCollection, projectId);
    await updateDoc(projectDocRef, { ...projectData });
    console.log('Project updated successfully!');
    return projectData.projectId;
  } catch (e) {
    console.error("Error updating project - ", e);
    return "";
  }
}

export const searchUsersIncrementallyByPartialUsername = async (searchTerm: string, ): Promise<UserEnt[]> => {
  try {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef, 
      where("username", ">=", searchTerm), 
      where("username", "<=", searchTerm + '\uf8ff'), 
      orderBy("username")
    );
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

export const getUserRecordByUserId = async (userId: string): Promise<UserEnt | null> => {
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
};

export const getProjectsByProjectId = async (projectId: string): Promise<ProjectEnt | null> => {
  try {
    const projectRef = doc(db, "projects", projectId); // Use doc instead of collection
    const docSnap = await getDoc(projectRef);

    if (docSnap.exists()) {
      return {
        id: projectId,
        data: docSnap.data()
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error retrieving document: ", e);
    return null;
  }
};

export const setupPrimaryEntityListener = (userId, onUpdate) => {
  const primaryEntityRef = doc(db, 'users', userId);
  const unsubscribe = onSnapshot(primaryEntityRef, (snapshot) => {
    if (snapshot.exists()) {
      const updatedEntityData = snapshot.data();
      const updatedEntity = {
        id: userId,
        data: updatedEntityData,
      };
      onUpdate(updatedEntity);
    } else {
      onUpdate(null);
    }
  });

  return unsubscribe;
};


const __generateFixedUUID = () => {
  const uuid = uuidv4(); 
  const uuidBytes = Uint8Array.from(
    uuid.replace(/-/g, '').match(/.{2}/g).map((byte) => parseInt(byte, 16))
  );
  // Encode UUID bytes using Base64
  const encodedUUID = btoa(String.fromCharCode.apply(null, uuidBytes));
  // Remove padding characters (=) and return the fixed-size UUID
  return encodedUUID.replace(/=+$/, '');
}

export default app;