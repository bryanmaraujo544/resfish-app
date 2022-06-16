import { Order } from '../types/Order';
import { AllOrdersReducerAction as Action } from '../types/AllOrdersReducerAction';

interface State {
  value: Order[];
}

export const allOrdersReducer = (
  state: State,
  action: Action
): { value: Order[] } => {
  switch (action.type) {
    case 'ADD-ORDERS': {
      return { value: action.payload };
    }
    case 'CHECK-ONE-PRODUCT': {
      const { orderId, productId } = action.payload;

      const orderToUpdate = state.value.find(({ _id }) => _id === orderId);
      const oldOrderProducts = orderToUpdate?.products;
      const newOrderProducts = oldOrderProducts?.map((product) => {
        if (product._id === productId) {
          return { ...product, isMade: true };
        }
        return product;
      });

      const updatedOrders = state.value.map((order) => {
        if (order._id === orderId) {
          return { ...orderToUpdate, products: newOrderProducts };
        }
        return order;
      });

      return { value: updatedOrders as Order[] };
    }
    case 'REMOVE-ONE-ORDER': {
      const orderIdToDelete = action.payload.order._id;
      const newOrders = state.value.filter(
        ({ _id }) => _id !== orderIdToDelete
      );
      return { value: newOrders };
    }
    default: {
      throw new Error('This type is invalid');
    }
  }
};
