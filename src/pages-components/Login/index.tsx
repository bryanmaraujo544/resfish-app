/* eslint-disable jsx-a11y/no-access-key */
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LoginLayout } from './layout';
import LoginService from './services/LoginService';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [accessKey, setAccessKey] = useState('');

  const router = useRouter();
  const toast = useToast();

  async function handleLogin(e: any) {
    e.preventDefault();
    try {
      if (!accessKey) {
        toast({
          status: 'error',
          title: 'Não deixe nada em branco :(',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // TODO: Make the request to the backend and see if the password is correct
      const { isAuthorized, message } = await LoginService.login(accessKey);

      if (!isAuthorized) {
        toast({
          status: 'error',
          title: 'Chave de acesso incorreta!',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      toast({
        status: 'success',
        title: message,
        duration: 1000,
      });
      router.push('/');
    } catch (error: any) {
      toast({
        status: 'error',
        title: error?.response.data.message,
      });
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
