export interface OrderProduct {
  _id: string;
  name: string;
  category?: string;
  isMade?: boolean;
  amount: number;
}
