import { serverApi } from 'services/serverApi';

interface Pay {
  commandId: string;
  paymentType: string;
}

class PaymentsService {
  async pay({ commandId, paymentType }: Pay) {
    const { data } = await serverApi.post('/payments', {
      commandId,
      paymentType,
    });
    return data;
  }
}

export default new PaymentsService();
