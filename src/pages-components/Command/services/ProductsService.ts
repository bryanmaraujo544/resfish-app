import { serverApi } from 'services/serverApi';

interface VerifyAmount {
  productId: string;
  amount: number;
}
class ProductsService {
  async getAllProducts() {
    const { data } = await serverApi('/products');
    return data;
  }

  async verifyAmount({ productId, amount }: VerifyAmount) {
    const { data } = await serverApi.post('/products/verify-amount', {
      productId,
      amount,
    });
    return data;
  }
}

export default new ProductsService();
