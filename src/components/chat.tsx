import { Box, IconButton, Input, Stack, Spinner } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { DocumentData, Timestamp } from 'firebase/firestore';
import { FiSend } from 'react-icons/fi';
import { sendMessage } from '../database';
import { useAuth } from '../contexts/AuthContext';

import { connect, Socket } from 'socket.io-client';

type MessageType = {
  content: string;
  timestamp: Timestamp | Date;
  sender: string;
};
interface Props {
  chat:
    | {
        id: string;
        messages: MessageType[];
        users: string[];
      }
    | DocumentData
    | undefined;
}

const Chat: React.FC<Props> = ({ chat }) => {
  const user = useAuth()?.user;
  const otherUser: string = chat?.users.filter(
    (u: string) => u !== user?.uid
  )[0];
  const [messages, setMessages] = useState<MessageType[]>(chat?.messages);
  const [socket, setSocket] = useState<Socket>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    const messageToSend = {
      to: otherUser,
      content: inputRef!.current!.value,
      timestamp: new Date(),
    };
    socket!.emit('send-message', messageToSend);
    sendMessage(chat?.id, user!.uid, messageToSend.content);
    setMessages([
      {
        content: messageToSend.content,
        timestamp: messageToSend.timestamp,
        sender: user!.uid,
      },
      ...messages,
    ]);
    inputRef!.current!.value = '';
  };

  useEffect(() => {
    const socketioURL = process.env.SOCKETIO_BACKEND as string;
    const ioClient = connect(socketioURL, {
      query: {
        user: user?.uid,
      },
    });

    ioClient.on('new-message', (m: MessageType) => {
      setMessages([m, ...messages]);
    });

    setSocket(ioClient);

    return () => {
      ioClient.disconnect();
    };
  }, [user, messages]);

  useEffect(() => {
    const messages: MessageType[] = chat?.messages;
    if (messages)
      messages.sort((a, b) =>
        a.timestamp.valueOf() < b.timestamp.valueOf() ? 1 : -1
      );
    setMessages(chat?.messages);
  }, [chat]);

  return (
    <Stack direction="column-reverse" bg="blackAlpha.700" h="100vh" w="100%">
      <Stack bg="black" py="2rem" px="1rem" direction="row">
        <Input
          ref={inputRef}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
        />
        <IconButton
          icon={<FiSend />}
          aria-label="send"
          onClick={handleSendMessage}
        />
      </Stack>
      <Stack direction="column-reverse" p="1rem">
        {messages ? (
          messages.map((message, i) => (
            <Stack
              direction={message.sender === user?.uid ? 'row-reverse' : 'row'}
              key={i}
              w="100%"
            >
              <Box
                p="1rem"
                bg="green.500"
                borderRadius="10px"
                boxSize="fit-content"
              >
                {message.content}
              </Box>
            </Stack>
          ))
        ) : (
          <Spinner />
        )}
      </Stack>
    </Stack>
  );
};

export default Chat;
