import { serverApi } from '../../../services/serverApi';

class StockService {
  async getAllProducts() {
    const { data } = await serverApi.get('/products');
    return data;
  }
}

export default new StockService();
