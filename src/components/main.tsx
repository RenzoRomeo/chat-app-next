import { Stack } from '@chakra-ui/react';
import Router from 'next/router';
import { useEffect, useState } from 'react';

import { getAllChats } from '../database';
import { useAuth } from '../contexts/AuthContext';
import Header from './header';
import ChatList from './chat-list';
import { DocumentData } from 'firebase/firestore';

const Main: React.FC = () => {
  const user = useAuth()?.user;
  const [chats, setChats] = useState<DocumentData[]>([]);

  useEffect(() => {
    if (!user) Router.push('/login');
    else {
      getAllChats(user)
        .then((data) => setChats(data))
        .catch((err) => console.error(err));
    }
  }, [user]);
  

  return (
    <Stack direction="row" w="100%">
      {user && (
        <Stack direction="column" boxSize="fit-content" h="100%">
          <Header />
          <ChatList chats={chats} />
        </Stack>
      )}
    </Stack>
  );
};

export default Main;
