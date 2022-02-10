import { Box, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Router from 'next/router';

import { getAllChats, getChatById, createNewChat } from '../database';
import { useAuth } from '../contexts/AuthContext';
import Header from './header';
import ChatListItem from './chat-list-item';
import Chat from './chat';
import { DocumentData } from 'firebase/firestore';

const Main: React.FC = () => {
  const user = useAuth()?.user;
  const [error, setError] = useState<string>('');
  const [currentChat, setCurrentChat] = useState<DocumentData>();
  const [chats, setChats] = useState<DocumentData[]>([]);

  useEffect(() => {
    setTimeout(() => {
      if (!user) Router.push('/login');
    }, 500);
    if (user)
      getAllChats(user)
        .then((data) => {
          setChats(data);
          setCurrentChat(data[0]);
        })
        .catch((err) => console.error(err));
  }, [user]);

  useEffect(() => {
    if (error !== '') console.error(error);
  }, [error]);

  const handleNewChat = (destinyUID: string) => {
    createNewChat({ originUID: user!.uid, destinyUID }).then(
      (newChatData: any) => {
        const { error, newChatId, existingChatID } = newChatData;
        if (error || existingChatID) {
          setError(error);
        } else {
          getChatById(newChatId).then((data: any) => {
            setCurrentChat(data);
            setChats([...chats, data]);
          });
        }
      }
    );
  };

  return (
    <Stack direction="row" w="100%" spacing={0}>
      {user && (
        <Stack direction="column" boxSize="fit-content" h="100%" spacing="0">
          <Header newChatHandler={handleNewChat} />
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
      <Chat chat={currentChat} />
    </Stack>
  );
};

export default Main;
