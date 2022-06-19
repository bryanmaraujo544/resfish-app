import { serverApi } from 'services/serverApi';

class PaymentsService {
  async getAll({ date }: { date: any }) {
    const { data } = await serverApi.get(`/payments?date=${date}`);
    return data;
  }
}

export default new PaymentsService();
