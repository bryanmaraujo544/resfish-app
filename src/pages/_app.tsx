/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext } from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import io from 'socket.io-client';

interface SocketProps {
  socket: any;
}

export const SocketContext = createContext({} as SocketProps);

const apiUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://resfish.herokuapp.com';

const socket = io(apiUrl as string);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SocketContext.Provider value={{ socket }}>
        <Component {...pageProps} />
      </SocketContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
