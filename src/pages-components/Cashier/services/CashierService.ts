import { serverApi } from 'services/serverApi';

class CashierService {
  async getOne(cashierId: string) {
    const { data } = await serverApi.get(`/cashiers/${cashierId}`);
    return data;
  }
}

export default new CashierService();
