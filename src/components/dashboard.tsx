import { Box, Text } from '@chakra-ui/react';
import Router from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const user = useAuth()?.user;

  useEffect(() => {
    if (!user) Router.push('/login');
  }, [user]);

  return (
    <Box>
      <Text>Dashboard</Text>
    </Box>
  );
};

export default Dashboard;
