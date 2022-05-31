import { serverApi } from 'services/serverApi';

class LoginService {
  async login(accessKey: string) {
    const { data } = await serverApi.post('/auth/login', { accessKey });
    return data;
  }
}

export default new LoginService();
