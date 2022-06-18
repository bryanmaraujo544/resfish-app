import { OrdersListLayout } from './layout';
import { Order } from '../../../../types/Order';

interface Props {
  orders: Order[];
}

export const OrdersList = ({ orders }: Props) => (
  <OrdersListLayout orders={orders} />
);
