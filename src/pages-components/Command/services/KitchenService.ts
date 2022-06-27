import { serverApi } from 'services/serverApi';
import { OrderProduct } from 'types/OrderProduct';

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
  isMade?: boolean;
}

interface DiminishOrder {
  orderId: string;
  productId: string;
  amount: number;
}

class KitchenService {
  async storeKitchenOrder({
    commandId,
    table,
    waiter,
    observation,
    products,
    isMade,
  }: Store) {
    const { data } = await serverApi.post('/kitchen/orders', {
      commandId,
      table,
      waiter,
      observation,
      products,
      isMade,
    });
    return data;
  }

  async diminishOrderProductAmount({
    orderId,
    productId,
    amount,
  }: DiminishOrder) {
    const {
      data: { kitchenOrder },
    } = await serverApi.get(`/kitchen/orders/${orderId}`);
    const oldOrderProducts = kitchenOrder.products;
    const newOrderProducts = oldOrderProducts.map((product: OrderProduct) => {
      if (product._id === productId) {
        return { ...product, amount: product.amount - amount };
      }
      return product;
    });

    // Taking out products that the amount is 0 when waiter mark products to ship now
    const newOrderProductsUpdated = newOrderProducts.filter(
      (product: any) => product.amount !== 0
    );

    const { data } = await serverApi.put(`/kitchen/orders/${orderId}`, {
      products: newOrderProductsUpdated,
    });
    return data;
  }

  async getCommandOrdersProducts({ commandId }: { commandId: string }) {
    const { data } = await serverApi.get(
      `/kitchen/get-command-orders/${commandId}`
    );
    return data;
  }

  async deleteOrdersOfCommand({ commandId }: { commandId: string }) {
    const { data } = await serverApi.delete(`/kitchen/orders/${commandId}`);
    return data;
  }
}

export default new KitchenService();
