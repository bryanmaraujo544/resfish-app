import { serverApi } from 'services/serverApi';
import { Payment } from '../types/Payment';

class CashierService {
  async closeCashier({ date, payments }: { date: any; payments: Payment[] }) {
    const { data } = await serverApi.post('/cashiers', { date, payments });
    return data;
  }
}

export default new CashierService();
