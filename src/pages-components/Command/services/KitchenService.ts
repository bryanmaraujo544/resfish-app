import { serverApi } from 'services/serverApi';

interface Product {
  _id: string;
  name: string;
  amount: number;
  isMade?: boolean;
}

interface Store {
  commandId: string;
  table: string;
  waiter: string;
  observation: string;
  products: Product[];
}

class KitchenService {
  async storeKitchenOrder({
    commandId,
    table,
    waiter,
    observation,
    products,
  }: Store) {
    const { data } = await serverApi.post('/kitchen/orders', {
      commandId,
      table,
      waiter,
      observation,
      products,
    });
    return data;
  }
}

export default new KitchenService();
