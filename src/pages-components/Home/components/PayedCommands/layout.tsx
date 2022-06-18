import { Heading, Stack } from '@chakra-ui/react';

interface Props {
  payedCommandsDate: string;
}

export const PayedCommandsLayout = ({ payedCommandsDate }: Props) => (
  <Stack>
    <Heading as="h2" fontSize={[20, 24]} color="blue.900">
      Comandas Pagas - {payedCommandsDate.toString()}
    </Heading>
    <h1>payed commands</h1>
  </Stack>
);
