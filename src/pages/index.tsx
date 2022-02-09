import { Center } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Dashboard from '../components/dashboard';

const Home: NextPage = () => {
  return (
    <Center pt="2rem">
      <Dashboard />
    </Center>
  );
};

export default Home;
