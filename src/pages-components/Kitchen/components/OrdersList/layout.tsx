import { Flex, Heading, Icon, Stack } from '@chakra-ui/react';
import { RiZzzFill } from 'react-icons/ri';

import { Order } from '../Order';
import { Order as OrderProps } from '../../../../types/Order';

interface Props {
  orders: OrderProps[];
}

export const OrdersListLayout = ({ orders }: Props) => (
  <Stack gap={[2, 4]} alignItems={orders.length === 0 ? 'center' : 'auto'}>
    {orders.length > 0 &&
      orders.map((order) => <Order order={order} key={order._id} />)}
    {orders.length === 0 && (
      <Flex
        gap={2}
        mt={4}
        align="center"
        justify="center"
        bg="blue.50"
        p={[2, 4]}
        boxShadow="sm"
        rounded={4}
      >
        <Icon as={RiZzzFill} fontSize={[20, 24]} color="blue.800" />
        <Heading color="blue.800" fontSize={[20, 24]} textAlign="center">
          Nenhum pedido a ser preparado
        </Heading>
      </Flex>
    )}
  </Stack>
);
