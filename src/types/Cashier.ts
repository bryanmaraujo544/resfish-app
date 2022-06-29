interface CashierProduct {
  _id: string;
  name: string;
  amount: number;
}

interface CashierCommand {
  _id: string;
  table: string;
  waiter: string;
  total: number;
  waiterExtra: number;
  products: CashierProduct[];
}

interface CashierPayment {
  _id: string;
  paymentTypes: string[];
  totalPayed: number;
  command: CashierCommand;
  waiterExtra?: number;
}

interface Cashier {
  _id: string;
  total: number;
  date: any;
  payments: CashierPayment[];
}

export type { Cashier, CashierPayment };
