import { Box, Button, Input, Stack, Text } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Signup: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const signup = useAuth()?.signup;

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    const email = emailRef.current;
    const password = passwordRef.current;
    const passwordConfirm = passwordConfirmRef.current;

    if (password?.value !== passwordConfirm?.value)
      return setError('Passwords do not match');

    try {
      setError('');
      setLoading(true);
      if (email && password && signup)
        await signup(email.value, password.value);
    } catch {
      setError('Failed to create account');
    }
    setLoading(false);
  };

  return (
    <Stack
      direction="column"
      bg="blackAlpha.500"
      w="20rem"
      borderRadius="10px"
      align="center"
      py="2rem"
      spacing="3rem"
    >
      <Text fontSize="3rem">Sign Up</Text>

      <Stack direction="column">
        {error && (
          <Box
            bg="red.600"
            p="1rem"
            textAlign="center"
            borderRadius="5px"
            mb="2rem"
          >
            {error}
          </Box>
        )}
        <Stack direction="column" spacing="2rem">
          <Input placeholder="Email" ref={emailRef} />
          <Input type="password" placeholder="Password" ref={passwordRef} />
          <Input
            type="password"
            placeholder="Password Confirmation"
            ref={passwordConfirmRef}
          />
          <Button disabled={loading} onClick={handleSubmit}>
            Sign Up
          </Button>
        </Stack>
        <Box
          h="1.5rem"
          w="100%"
          borderBottomColor="gray.500"
          borderBottomWidth="1px"
        ></Box>
        <Stack direction="row">
          <Text>Already have an account?</Text>
          <Text color="blue.500">Log In</Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Signup;
