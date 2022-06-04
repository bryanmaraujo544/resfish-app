import { serverApi } from 'services/serverApi';

class ProductsService {
  async getAllProducts() {
    const { data } = await serverApi('/products');
    return data;
  }
}

export default new ProductsService();
