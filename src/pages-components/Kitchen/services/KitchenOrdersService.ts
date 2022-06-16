import { serverApi } from 'services/serverApi';

class KitchenOrdersService {
  async gelAll() {
    const { data } = await serverApi.get('/kitchen/orders');
    return data;
  }
}

export default new KitchenOrdersService();
