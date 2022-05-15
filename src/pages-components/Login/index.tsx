/* eslint-disable jsx-a11y/no-access-key */
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LoginLayout } from './layout';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [accessKey, setAccessKey] = useState('');

  const router = useRouter();
  const toast = useToast();

  function handleLogin(e: any) {
    e.preventDefault();
    if (!accessKey) {
      toast({
        status: 'error',
        title: 'Não deixe nada em branco :(',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // TODO: Make the request to the backend and see if the password is correct
    const isAllowed: boolean = true;
    if (isAllowed) {
      router.push('/');
    }
  }
  return (
    <LoginLayout
      setShowPassword={setShowPassword}
      showPassword={showPassword}
      handleLogin={handleLogin}
      accessKey={accessKey}
      setAccessKey={setAccessKey}
    />
  );
};
