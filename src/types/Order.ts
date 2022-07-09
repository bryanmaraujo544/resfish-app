import { OrderProduct } from './OrderProduct';

export interface Order {
  commandId?: string;
  _id: string;
  table: string;
  waiter: string;
  observation: string;
  products: OrderProduct[];
  createdAt?: string;
}
