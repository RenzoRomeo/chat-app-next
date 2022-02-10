import { db } from './firebase';
import {
  addDoc,
  collection,
  getDocs,
  setDoc,
  query,
  where,
} from 'firebase/firestore';
import { UserType } from './contexts/AuthContext';

export const getAllChats = async (user: UserType) => {
  const chatsRef = collection(db, 'chats');
  const q = query(chatsRef, where('users', 'array-contains', user?.uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const createNewChat = () => {
  
};

export const getAllMessages = async () => {};

export const saveUserData = async (user: UserType) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      uid: user?.uid,
      email: user?.email,
      photoURL: user?.photoURL,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (err) {
    console.error(err);
  }
};

export const getUserByUID = async (uid: string) => {
  const usersRef = collection(db, 'users');
  const user = query(usersRef, where('uid', '==', uid));
  const userSnapshot = await getDocs(user);
  return userSnapshot.docs[0].data();
};

// Test function, do not use
const setFirstTime = async () => {
  try {
    const docRef = await addDoc(collection(db, 'chats'), {
      users: ['7coPq1oGThf52mlzRWg3ZwkQb9U2', 'MWc74U70nNTd7Fn3Afn5h65LMoX2'],
      messages: [
        {
          content: 'Testing 1',
          timestamp: new Date(),
        },
        {
          content: 'Testing 2',
          timestamp: new Date(),
        },
      ],
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (err) {
    console.error(err);
  }
};
