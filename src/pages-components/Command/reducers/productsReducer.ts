import { Product } from 'types/Product';

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
    | 'delete';
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

    default:
      throw new Error('This type is invalid');
  }
};
