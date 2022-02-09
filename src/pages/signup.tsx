import { NextPage } from 'next';
import { Center } from '@chakra-ui/react';

import Signup from '../components/signup';

const SignupPage: NextPage = () => {
  return (
    <Center pt="2rem">
      <Signup />
    </Center>
  );
};

export default SignupPage;
