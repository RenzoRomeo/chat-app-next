import { NextPage } from 'next';
import { Center } from '@chakra-ui/react';
import Router from 'next/router';

import Login from '../components/login';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

const LoginPage: NextPage = () => {
  const user = useAuth()?.user;

  useEffect(() => {
    if (user) Router.push('/');
  }, [user]);

  return (
    <Center pt="2rem">
      <Login />
    </Center>
  );
};

export default LoginPage;
