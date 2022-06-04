interface Product {
  name: string;
  amount: number;
  unitPrice: number;
}

export interface Command {
  _id?: string;
  table?: string;
  waiter?: string;
  fishingType?: string;
  products?: Product[];
  total?: number;
  isActive?: boolean;
}
