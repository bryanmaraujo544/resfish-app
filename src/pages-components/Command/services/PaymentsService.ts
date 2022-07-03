import { serverApi } from 'services/serverApi';

interface Pay {
  commandId: string;
  paymentTypes: string[];
  waiterExtra: number;
  observation?: string;
  discount: number;
}

class PaymentsService {
  async pay({
    commandId,
    paymentTypes,
    waiterExtra,
    observation,
    discount,
  }: Pay) {
    const { data } = await serverApi.post('/payments', {
      commandId,
      paymentTypes,
      waiterExtra,
      observation,
      discount,
    });
    return data;
  }
}

export default new PaymentsService();
