import { Stack } from '@chakra-ui/react';

import { Order } from '../Order';
import { Order as OrderProps } from '../../types/Order';

interface Props {
  orders: OrderProps[];
}

export const OrdersListLayout = ({ orders }: Props) => (
  <Stack gap={[2, 4]}>
    {orders.map((order) => (
      <Order order={order} key={order._id} />
    ))}
  </Stack>
);
