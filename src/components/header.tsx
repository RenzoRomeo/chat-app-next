import { Avatar, IconButton, Input, Stack, Text } from '@chakra-ui/react';
import { FiUserX, FiPlusCircle } from 'react-icons/fi';
import Router from 'next/router';
import { useState, useRef } from 'react';

import { useAuth } from '../contexts/AuthContext';
import type { UserType } from '../contexts/AuthContext';

interface Props {
  newChatHandler: (destinyUID: string) => void;
}

const Header: React.FC<Props> = ({ newChatHandler }) => {
  const [showNewInput, setShowNewInput] = useState<boolean>(false);
  const user: UserType = useAuth()!.user;
  const signout = useAuth()!.signout;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSignOut = () => {
    signout()
      .then(() => {
        Router.push('/login');
      })
      .catch((e) => console.error(e));
  };

  const handleSubmit = (e: any) => {
    if (e.key === 'Enter') {
      newChatHandler(inputRef!.current!.value);
    }
  };

  return (
    <Stack direction="column" spacing="0">
      <Stack
        direction="row"
        p="2rem"
        align="center"
        bg="blackAlpha.400"
        spacing="2rem"
      >
        <Stack direction="row" align="center" spacing="1rem">
          <Avatar src={user?.photoURL || ''} />
          <Stack>
            <Text fontSize="1.2rem">{user?.email}</Text>
            <Text fontSize="1rem" color="gray.400">
              {user!.uid}
            </Text>
          </Stack>
        </Stack>
        <IconButton
          aria-label="logout"
          icon={<FiUserX />}
          onClick={handleSignOut}
        />
        <IconButton
          aria-label="new chat"
          icon={<FiPlusCircle />}
          bg={showNewInput ? 'green.700' : 'green.500'}
          onClick={() => setShowNewInput(!showNewInput)}
        />
      </Stack>
      <Input
        ref={inputRef}
        display={showNewInput ? 'block' : 'none'}
        placeholder="Insert UID"
        onKeyPress={handleSubmit}
      />
    </Stack>
  );
};

export default Header;
