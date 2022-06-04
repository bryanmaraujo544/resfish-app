/* eslint-disable react/destructuring-assignment */
import { Box } from '@chakra-ui/react';

export const Layout = (props: any) => (
  <Box px={[4, 8, 12, 14]} {...props} minHeight="100vh">
    {props.children}
  </Box>
);
