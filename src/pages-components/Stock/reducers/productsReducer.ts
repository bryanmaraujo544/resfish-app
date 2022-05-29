/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */

import { Product } from '../types/Product';

interface Action {
  type: 'ADD-PRODUCTS' | 'ADD-ONE-PRODUCT' | 'REMOVE-ONE-PRODUCT';
  payload: any;
}

interface ProductsState {
  value: Product[] | [];
}

type Reducer = (
  state: ProductsState,
  action: Action
) => { value: ProductsState };

export const productsReducer = (state: ProductsState, action: Action) => {
  switch (action.type) {
    case 'ADD-PRODUCTS': {
      return { value: action.payload };
    }
    case 'ADD-ONE-PRODUCT': {
      return { value: [...state.value, action.payload.product] };
    }
    case 'REMOVE-ONE-PRODUCT': {
      const updatedProducts = state.value.filter(
        (product) => product._id !== action.payload.id
      );
      return { value: updatedProducts };
    }
    default:
      throw new Error('This type is invalid');
  }
};
