/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */

import { Product } from '../types/Product';

interface Action {
  type:
    | 'ADD-PRODUCTS'
    | 'ADD-ONE-PRODUCT'
    | 'REMOVE-ONE-PRODUCT'
    | 'UPDATE-ONE-PRODUCT'
    | 'FAVORITE-PRODUCT'
    | 'UNFAVORITE-PRODUCT';
  payload: any;
}

interface ProductsState {
  value: Product[] | [];
}

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
    case 'UPDATE-ONE-PRODUCT': {
      const updatedProducts = state.value.map((product) => {
        if (product._id === action.payload.product._id) {
          return action.payload.product;
        }
        return product;
      });
      return { value: updatedProducts };
    }
    case 'FAVORITE-PRODUCT': {
      const payloadProduct = action?.payload?.product;
      const newState = state.value.map((product: Product) => {
        if (product._id === payloadProduct?._id) {
          return {
            ...product,
            isFavorite: true,
          };
        }
        return product;
      });
      return { value: newState };
    }
    case 'UNFAVORITE-PRODUCT': {
      const payloadProduct = action?.payload?.product;
      const newState = state.value.map((product: Product) => {
        if (product._id === payloadProduct?._id) {
          return {
            ...product,
            isFavorite: false,
          };
        }
        return product;
      });
      return { value: newState };
    }
    default:
      throw new Error('This type is invalid');
  }
};
