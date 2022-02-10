import { Box, IconButton, Input, Stack, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { DocumentData, Timestamp } from 'firebase/firestore';
import { FiSend } from 'react-icons/fi';
import { sendMessage } from '../database';
import { useAuth } from '../contexts/AuthContext';

type MessageType = Array<{
  content: string;
  timestamp: Timestamp | Date;
  sender: string;
}>;
interface Props {
  chat:
    | {
        id: string;
        messages: MessageType;
      }
    | DocumentData
    | undefined;
}

const Chat: React.FC<Props> = ({ chat }) => {
  const user = useAuth()?.user;
  const [messages, setMessages] = useState<MessageType>(chat?.messages);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    sendMessage(chat?.id, user!.uid, inputRef!.current!.value).then(
      (newMessage) => {
        setMessages([newMessage, ...messages]);
      }
    );
    inputRef.current!.value = '';
  };

  useEffect(() => {
    const messages: MessageType = chat?.messages;
    if (messages)
      messages.sort((a, b) =>
        a.timestamp.valueOf() < b.timestamp.valueOf() ? 1 : -1
      );
    setMessages(chat?.messages);
  }, [chat]);

  return (
    <Stack direction="column-reverse" bg="blackAlpha.700" h="100vh" w="100%">
      <Stack bg="black" py="2rem" px="1rem" direction="row">
        <Input ref={inputRef} />
        <IconButton
          icon={<FiSend />}
          aria-label="send"
          onClick={handleSendMessage}
        />
      </Stack>
      <Stack direction="column-reverse" p="1rem">
        {messages &&
          messages.map((message, i) => (
            <Stack
              direction={message.sender === user?.uid ? 'row-reverse' : 'row'}
              key={i}
              w="100%"
            >
              <Box p="1rem" bg="green.500" borderRadius="10px" boxSize="fit-content">
                {message.content}
              </Box>
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
};

export default Chat;
