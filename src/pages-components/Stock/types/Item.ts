import { Dispatch, SetStateAction } from 'react';

export interface Item {
  id: number | string | null;
  image: string;
  name: string;
  amount: number | null;
  unitPrice: string;
  setName: Dispatch<SetStateAction<string>>;
  setImage: Dispatch<SetStateAction<string>>;
  setAmount: Dispatch<SetStateAction<number | null>>;
  setUnitPrice: Dispatch<SetStateAction<string>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}
