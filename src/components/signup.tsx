import { Box, Button, Input, LinkBox, Stack, Text } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import { useAuth } from '../contexts/AuthContext';
import { saveUserData } from '../database';

const Signup: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const signup = useAuth()?.signup;

  const handleSubmit = async (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const email = emailRef.current;
    const password = passwordRef.current;
    const passwordConfirm = passwordConfirmRef.current;

    if (password?.value !== passwordConfirm?.value)
      return setError('Passwords do not match');

    try {
      setError('');
      setLoading(true);
      if (email && password && signup) {
        signup(email.value, password.value)
          .then((userCred) => userCred.user)
          .then((user) => saveUserData(user))
          .then(() => Router.push('/'));
      }
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
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSubmit(e);
            }}
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
          <Link href="/login" passHref>
            <LinkBox>
              <Text color="blue.500" cursor="pointer">
                Log In
              </Text>
            </LinkBox>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Signup;
