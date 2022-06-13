import { Product } from 'types/Product';
import CommandService from '../services/CommandService';
import ProductsService from '../services/ProductsService';
// import CommandService from '../services/CommandService';

interface State {
  value: Product[];
}

interface Action {
  type:
    | 'add-products'
    | 'add'
    | 'increment-amount'
    | 'decrement-amount'
    | 'update-product-amount'
    | 'update-product-total-payed'
    | 'delete'
    | 'save-amount';
  payload: any;
}

export const productsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'add-products': {
      return { value: action.payload as Product[] };
    }
    case 'add':
      return { value: [...state.value, action.payload] as Product[] };
    case 'increment-amount': {
      const newState = state.value.map((product: Product) => {
        if (product._id === action.payload.id) {
          return { ...product, amount: product.amount + 1 };
        }
        return product;
      });
      return { value: [...newState] as Product[] };
    }
    case 'decrement-amount': {
      const newState = state.value.map((product: Product) => {
        if (product._id === action.payload.id) {
          return {
            ...product,
            amount: product.amount > 0 ? product.amount - 1 : product.amount,
          };
        }
        return product;
      });
      return { value: [...newState] as Product[] };
    }
    case 'update-product-amount': {
      const newState = state.value.map((product: Product) => {
        if (product._id === action.payload.product.id) {
          return {
            ...product,
            amount: action.payload.product.amount,
          };
        }
        return product;
      });
      return { value: [...newState] as Product[] };
    }
    case 'update-product-total-payed': {
      const newState = state.value.map((product: Product) => {
        if (product._id === action.payload.product.id) {
          return {
            ...product,
            totalPayed: product.totalPayed + action.payload.product.totalPayed,
          };
        }
        return product;
      });
      return { value: newState as Product[] };
    }
    case 'delete': {
      const newState = state.value.filter(
        (product: Product) => product._id !== action.payload.product._id
      );
      return { value: newState as Product[] };
    }
    case 'save-amount': {
      const [updatedProduct] = state.value.filter(
        (product: any) => product._id === action.payload.id
      );
      const productId = action.payload.id;
      const { setCommand } = action.payload;

      (async () => {
        try {
          const { commandId } = action.payload;
          const { command } = await CommandService.getOneCommand({ commandId });
          const oldProductAmount = command.products.find(
            ({ _id }: any) => _id === productId
          ).amount;

          if (updatedProduct.amount > oldProductAmount) {
            // It means the products amount increase. So I need to diminish in stock how much it increased
            const { product: stockUpdatedProduct } =
              await ProductsService.diminishAmount({
                productId,
                amount: updatedProduct.amount - oldProductAmount,
              });
            action.payload.stockProductsDispatch({
              type: 'UPDATE-ONE-PRODUCT',
              payload: { product: stockUpdatedProduct },
            });
          }

          if (oldProductAmount > updatedProduct.amount) {
            const { product: stockUpdatedProduct } =
              await ProductsService.increaseAmount({
                productId,
                amount: oldProductAmount - updatedProduct.amount,
              });
            action.payload.stockProductsDispatch({
              type: 'UPDATE-ONE-PRODUCT',
              payload: { product: stockUpdatedProduct },
            });
          }

          const newProducts = command?.products?.map((product: Product) => {
            if (product._id === productId) {
              const newProduct = {
                ...product,
                amount: updatedProduct.amount as number,
              };
              return newProduct;
            }
            return product;
          });

          const { command: updatedCommand } =
            await CommandService.updateCommand({
              _id: commandId,
              products: newProducts,
            });

          setCommand(updatedCommand);
        } catch (err: any) {
          action.payload.toast({
            status: 'error',
            title: err?.response?.data?.message,
            duration: 3000,
            isClosable: true,
          });
        }
      })();

      return { value: state.value as Product[] };
    }
    default:
      throw new Error('This type is invalid');
  }
};
