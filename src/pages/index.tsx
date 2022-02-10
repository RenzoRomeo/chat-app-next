import { Center } from '@chakra-ui/react';
import type { NextPage } from 'next';

import Main from '../components/main';
import { getAllChats } from '../database';
import { DocumentData } from 'firebase/firestore';

interface Props {
  chats: DocumentData;
}

const Home: NextPage<Props> = (props) => {
  const { chats } = props;

  return (
    <Center>
      <Main />
    </Center>
  );
};

export default Home;
