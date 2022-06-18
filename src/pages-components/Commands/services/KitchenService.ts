import { serverApi } from 'services/serverApi';

class KitchenService {
  async deleteOrdersOfCommand({ commandId }: { commandId: string }) {
    const { data } = await serverApi.delete(`/kitchen/orders/${commandId}`);
    return data;
  }
}

export default new KitchenService();
