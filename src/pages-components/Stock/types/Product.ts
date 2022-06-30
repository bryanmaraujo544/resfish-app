export interface Product {
  _id?: string;
  name: string;
  amount: number;
  imageURL?: string;
  category: string;
  unitPrice: number;
  isFavorite?: boolean;
}
