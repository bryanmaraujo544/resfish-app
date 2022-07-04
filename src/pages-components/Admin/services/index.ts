import { serverApi } from 'services/serverApi';

class AdminService {
  async deleteCommands(accessKey: string) {
    const { data } = await serverApi.post('/admin/commands', { accessKey });
    return data;
  }

  async deletePayments(accessKey: string) {
    const { data } = await serverApi.post('/admin/payments', { accessKey });
    return data;
  }
}

export default new AdminService();
