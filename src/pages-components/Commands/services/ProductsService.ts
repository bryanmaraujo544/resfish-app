import { serverApi } from 'services/serverApi';

interface VerifyAmount {
  productId: string;
  amount: number;
}

interface FavoriteStatus {
  productId: string;
  isFavorite: boolean;
}

type IncreaseAmount = VerifyAmount;
type DecreaseAmount = IncreaseAmount;
class ProductsService {
  async getAllProducts() {
    const { data } = await serverApi.get('/products');
    return data;
  }

  async verifyAmount({ productId, amount }: VerifyAmount) {
    const { data } = await serverApi.post('/products/verify-amount', {
      productId,
      amount,
    });
    return data;
  }

  async updateFavoriteStatus({ productId, isFavorite }: FavoriteStatus) {
    const { data } = await serverApi.put(
      `/products/${productId}?isUpdateFavorite=true`,
      {
        isFavorite,
      }
    );
    return data;
  }

  async increaseAmount({ productId, amount }: IncreaseAmount) {
    const { data } = await serverApi.put(
      '/products-update-amount?operation=increase',
      { productId, amount }
    );
    return data;
  }

  async diminishAmount({ productId, amount }: DecreaseAmount) {
    const { data } = await serverApi.put(
      '/products-update-amount?operation=diminish',
      { productId, amount }
    );
    return data;
  }
}

export default new ProductsService();
