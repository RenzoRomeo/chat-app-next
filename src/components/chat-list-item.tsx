import { Avatar, Stack, Text } from '@chakra-ui/react';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { UserType } from '../contexts/AuthContext';
import { getUserByUID } from '../database';

interface Props {
  otherUserUID: string;
}

const ChatListItem: React.FC<Props> = (props) => {
  const [otherUser, setOtherUser] = useState<DocumentData | UserType>();
  const { otherUserUID } = props;

  useEffect(() => {
    getUserByUID(otherUserUID).then((user) => {
      setOtherUser(user);
    });
  }, [otherUserUID]);

  return (
    <Stack direction="row" h="3rem">
      <Avatar src={otherUser?.photoURL || ''} />
      <Text>{otherUser?.email}</Text>
    </Stack>
  );
};

export default ChatListItem;
