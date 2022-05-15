import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => (
  <Box px={[8, 12, 14, 16]}>{children}</Box>
);
