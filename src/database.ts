import { db } from './firebase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
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

export const createNewChat = async (uids: {
  originUID: string;
  destinyUID: string;
}) => {
  const { originUID, destinyUID } = uids;

  const usersRef = collection(db, 'users');
  const qUsers = query(usersRef, where('uid', '==', destinyUID));
  const userSnapshot = await getDocs(qUsers);
  if (userSnapshot.empty) return { error: "User doesn't exist" };

  const chatsRef = collection(db, 'chats');
  const qChats = query(
    chatsRef,
    where('users', 'array-contains', uids.originUID)
  );
  const chatsSnapshot = await getDocs(qChats);
  const chat = chatsSnapshot.docs.filter(doc => doc.data().users.includes(uids.destinyUID));
  if (chat.length === 0) {
    const chatDoc = await addDoc(chatsRef, {
      users: [originUID, destinyUID],
      messages: [],
    });
    return { newChatId: chatDoc.id };
  }
  return {
    error: 'A chat already exists with that user',
    exisingChatID: chatsSnapshot.docs[0].id,
  };
};

export const getChatById = async (id: string) => {
  const chatsRef = collection(db, 'chats');
  const q = query(chatsRef, where('__name__', '==', id));
  const chat = await getDocs(q);
  return chat.docs[0].data();
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
