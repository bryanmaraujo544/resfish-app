import { OrderProduct } from './OrderProduct';

export interface Order {
  _id: string;
  table: string;
  waiter: string;
  observation: string;
  products: OrderProduct[];
}