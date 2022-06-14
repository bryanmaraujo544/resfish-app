import { Product } from 'types/Product';

interface State {
  value: Product[];
}

interface Action {
  type: 'ADD-ALL-PRODUCTS' | 'UPDATE-ONE-PRODUCT';
  payload: any;
}

export const stockProductsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD-ALL-PRODUCTS': {
      return { value: action.payload };
    }
    case 'UPDATE-ONE-PRODUCT': {
      if (!action.payload?.product?._id) {
        return { value: state.value };
      }
      const newState = state.value.map((product: Product) => {
        if (product._id === action.payload?.product?._id) {
          return action.payload?.product;
        }
        return product;
      });
      return { value: newState };
    }
    default: {
      throw new Error('This type is unknown');
    }
  }
};
