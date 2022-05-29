import { serverApi } from '../../../services/serverApi';
import { Product } from '../types/Product';

class StockService {
  async getAllProducts() {
    const { data } = await serverApi.get('/products');
    return data;
  }

  async storeProduct(product: Product) {
    const { data } = await serverApi.post('/products', product);
    return data;
  }
}

export default new StockService();
