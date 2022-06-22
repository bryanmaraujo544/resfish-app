import { serverApi } from 'services/serverApi';

interface Pay {
  commandId: string;
  paymentType: string;
  waiterExtra: number;
}

class PaymentsService {
  async pay({ commandId, paymentType, waiterExtra }: Pay) {
    const { data } = await serverApi.post('/payments', {
      commandId,
      paymentType,
      waiterExtra,
    });
    return data;
  }
}

export default new PaymentsService();
