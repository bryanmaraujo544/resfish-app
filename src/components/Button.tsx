/* eslint-disable react/destructuring-assignment */

import { Button as ChakraButton } from '@chakra-ui/react';

export const Button = (props: any) => (
  <ChakraButton
    {...props}
    alignItems="center"
    gap={[1, 1, 2]}
    bg={props.isCallAction ? 'blue.400' : 'blue.50'}
    color={props.isCallAction ? 'blue.50' : 'blue.800'}
    boxShadow="base"
    fontSize={['sm', 'md', 'lg']}
    fontWeight={600}
    p={[2, 4, 6]}
    _hover={{
      bg: props.isCallAction ? 'blue.500' : 'blue.200',
      color: props.isCallAction ? 'blue.50' : 'blue.700',
    }}
    _active={{
      bg: props.isCallAction ? 'blue.400' : 'blue.50',
      color: props.isCallAction ? 'blue.50' : 'blue.700',
    }}
  >
    {props.children}
  </ChakraButton>
);
