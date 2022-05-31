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

  async deleteProduct(id: string) {
    const { data } = await serverApi.delete(`/products/${id}`);
    return data;
  }

  async updateProduct(product: Product) {
    const { data } = await serverApi.put(`/products/${product._id}`, product);
    return data;
  }
}

export default new StockService();
