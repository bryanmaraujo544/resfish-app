import { Order as OrderProps } from '../types/Order';
import { OrderLayout } from './styles';

interface Props {
  order: OrderProps;
}

export const Order = ({ order }: Props) => {
  console.log('order', order);

  return <OrderLayout order={order} />;
};
