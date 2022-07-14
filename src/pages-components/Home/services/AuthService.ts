import { serverApi } from 'services/serverApi';

class AuthService {
  async accessClosedCashiers(accessKey: string) {
    const { data } = await serverApi.post('/auth/access-closed-cashiers', {
      accessKey,
    });
    return data;
  }
}

export default new AuthService();
