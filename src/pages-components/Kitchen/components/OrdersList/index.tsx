import { OrdersListLayout } from './layout';
import { Order } from '../../types/Order';

interface Props {
  orders: Order[];
}

export const OrdersList = ({ orders }: Props) => {
  console.log('orders list');

  return <OrdersListLayout orders={orders} />;
};
