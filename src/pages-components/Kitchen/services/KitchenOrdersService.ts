import { serverApi } from 'services/serverApi';
import { OrderProduct } from '../../../types/OrderProduct';

interface CheckOneProduct {
  orderId: string;
  products: OrderProduct[];
}

interface CheckOneOrder {
  orderId: string;
  isMade: boolean;
}
class KitchenOrdersService {
  async gelAll() {
    const { data } = await serverApi.get('/kitchen/orders');
    return data;
  }

  async checkOneOrderProduct({ orderId, products }: CheckOneProduct) {
    const { data } = await serverApi.put(`/kitchen/orders/${orderId}`, {
      products,
    });
    return data;
  }

  async checkOneOrder({ orderId, isMade }: CheckOneOrder) {
    const { data } = await serverApi.put(`/kitchen/orders/${orderId}`, {
      isMade,
    });
    return data;
  }
}

export default new KitchenOrdersService();
