import { NextPage } from 'next';
import { Center } from '@chakra-ui/react';

import Login from '../components/login';

const LoginPage: NextPage = () => {
  return (
    <Center pt="2rem">
      <Login />
    </Center>
  );
};

export default LoginPage;
