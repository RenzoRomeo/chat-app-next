import { Stack } from '@chakra-ui/react';
import type { DocumentData, Timestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

import ChatListItem from './chat-list-item';

type Chat = {
  users: string[];
  messages: { content: string; timestamp: Timestamp };
};

interface Props {
  chats: Chat[] | DocumentData[];
}

const ChatList: React.FC<Props> = (props) => {
  const { chats } = props;
  const user = useAuth()!.user;

  return (
    <Stack direction="column" spacing={0}>
      {chats.map((chat, i) => (
        <ChatListItem
          key={i}
          otherUserUID={
            chat.users.filter((uid: string) => uid !== user?.uid)[0]
          }
        />
      ))}
    </Stack>
  );
};

export default ChatList;
