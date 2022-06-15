import { useEffect, useState } from 'react';
import { KitchenLayout } from './layout';
import orders from './mocks/orders';
import { Order } from './types/Order';

export const Kitchen = () => {
  console.log('Kitchen');
  const [allOrders, setAllOrders] = useState<Order[]>([]);

  useEffect(() => {
    setAllOrders(orders);
  }, []);

  return <KitchenLayout orders={allOrders} />;
};
