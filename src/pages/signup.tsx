import { NextPage } from 'next';
import { Center } from '@chakra-ui/react';
import Router from 'next/router';

import Signup from '../components/signup';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const SignupPage: NextPage = () => {
  const user = useAuth()?.user;

  useEffect(() => {
    if (user) Router.push('/');
  }, [user]);

  return (
    <Center pt="2rem">
      <Signup />
    </Center>
  );
};

export default SignupPage;
