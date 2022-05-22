import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => (
  <Box px={[4, 8, 12, 14]}>{children}</Box>
);
