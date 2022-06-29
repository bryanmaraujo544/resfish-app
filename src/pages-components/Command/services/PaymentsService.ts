import { serverApi } from 'services/serverApi';

interface Pay {
  commandId: string;
  paymentTypes: string[];
  waiterExtra: number;
  observation?: string;
}

class PaymentsService {
  async pay({ commandId, paymentTypes, waiterExtra, observation }: Pay) {
    const { data } = await serverApi.post('/payments', {
      commandId,
      paymentTypes,
      waiterExtra,
      observation,
    });
    return data;
  }
}

export default new PaymentsService();
