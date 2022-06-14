/* eslint-disable jsx-a11y/no-access-key */
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { useState } from 'react';
import { LoginLayout } from './layout';
import LoginService from './services/LoginService';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [sendedLoginRequest, setSendedLoginRequest] = useState(false);

  const router = useRouter();
  const toast = useToast();

  async function handleLogin(e: any) {
    e.preventDefault();
    if (sendedLoginRequest) {
      return;
    }
    try {
      setSendedLoginRequest(true);
      if (!accessKey) {
        toast.closeAll();
        toast({
          status: 'error',
          title: 'Não deixe nada em branco :(',
          duration: 3000,
          isClosable: true,
        });
        setSendedLoginRequest(false);
        return;
      }

      // TODO: Make the request to the backend and see if the password is correct
      const { isAuthorized, message } = await LoginService.login(accessKey);

      if (!isAuthorized) {
        toast.closeAll();
        toast({
          status: 'error',
          title: 'Chave de acesso incorreta!',
          duration: 3000,
          isClosable: true,
        });
        setSendedLoginRequest(false);
        return;
      }

      toast.closeAll();
      toast({
        status: 'success',
        title: message,
        duration: 1000,
      });

      setCookie(null, 'isAuthorized', 'true', {
        maxAge: 60 * 60 * 24 * 20,
      });

      router.push('/');
    } catch (error: any) {
      setSendedLoginRequest(false);
      toast.closeAll();
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
      sendedLoginRequest={sendedLoginRequest}
    />
  );
};
