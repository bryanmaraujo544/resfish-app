import { Dispatch, SetStateAction } from 'react';
import { Order } from '../../../types/Order';
import { AllOrdersReducerAction as Action } from './AllOrdersReducerAction';

export interface KitchenContextProps {
  allOrders: Order[];
  allOrdersDispatch: Dispatch<Action>;
  setIsCheckOrderModalOpen: Dispatch<SetStateAction<boolean>>;
  setOrderToCheck: Dispatch<SetStateAction<Order>>;
}
