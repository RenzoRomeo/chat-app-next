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
    <Stack
      direction="row"
      w="100%"
      p="1.5rem"
      align="center"
      _hover={{ bg: 'blackAlpha.500' }}
    >
      <Avatar src={otherUser?.photoURL || ''} />
      <Text fontSize="1.5rem">{otherUser?.email}</Text>
    </Stack>
  );
};

export default ChatListItem;
