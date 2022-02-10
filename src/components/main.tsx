import { Box, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { getAllChats } from '../database';
import { useAuth } from '../contexts/AuthContext';
import Header from './header';
import ChatListItem from './chat-list-item';
import { DocumentData } from 'firebase/firestore';

const Main: React.FC = () => {
  const user = useAuth()?.user;

  const [currentChat, setCurrentChat] = useState<DocumentData>();
  const [chats, setChats] = useState<DocumentData[]>([]);

  useEffect(() => {
    if (user)
      getAllChats(user)
        .then((data) => setChats(data))
        .catch((err) => console.error(err));
  }, [user]);

  const handleNewChat = () => {
    // createNewChat().then(chat => setCurrentChat(chat));
  };

  return (
    <Stack direction="row" w="100%">
      {user && (
        <Stack direction="column" boxSize="fit-content" h="100%" spacing="0">
          <Header />
          <Stack direction="column" spacing={0}>
            {chats.map((chat, i) => (
              <Box
                key={i}
                onClick={() => {
                  setCurrentChat(chat);
                }}
                bg={
                  currentChat && currentChat.id === chat.id
                    ? 'whiteAlpha.200'
                    : 'blackAlpha.200'
                }
              >
                <ChatListItem
                  otherUserUID={
                    chat.users.filter((uid: string) => uid !== user?.uid)[0]
                  }
                />
              </Box>
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default Main;
