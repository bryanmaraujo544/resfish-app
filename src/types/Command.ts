import { Product } from './Product';

export interface Command {
  _id?: string;
  table?: string;
  waiter?: string;
  fishingType?: string;
  products?: Product[];
  total?: number;
  isActive?: boolean;
  totalPayed?: number;
  createdAt?: string;
  waiterExtra?: number;
  paymentTypes?: string[];
  discount?: number;
}
