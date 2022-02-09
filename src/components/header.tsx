import { Avatar, IconButton, Stack, Text } from '@chakra-ui/react';
import { FiUserX, FiPlusCircle } from 'react-icons/fi';
import Router from 'next/router';

import { useAuth } from '../contexts/AuthContext';
import type { UserType } from '../contexts/AuthContext';

const Header = () => {
  const user: UserType = useAuth()!.user;
  const signout = useAuth()!.signout;

  const handleSignOut = () => {
    signout()
      .then(() => {
        Router.push('/');
      })
      .catch((e) => console.error(e));
  };

  return (
    <Stack
      direction="row"
      p="2rem"
      align="center"
      bg="blackAlpha.400"
      spacing="2rem"
    >
      <Stack direction="row" align="center" spacing="1rem">
        <Avatar src={user?.photoURL || ''} />
        <Text fontSize="1.2rem">{user?.email}</Text>
      </Stack>
      <IconButton
        aria-label="logout"
        icon={<FiUserX />}
        onClick={handleSignOut}
      />
      <IconButton aria-label="new chat" icon={<FiPlusCircle />}/>
    </Stack>
  );
};

export default Header;
