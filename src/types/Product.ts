export interface Product {
  _id: string;
  name: string;
  amount: number;
  unitPrice: number;
  category?: string;
  totalPayed?: number;
  isFavorite?: boolean;
}
