/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useEffect, useReducer, useState } from 'react';
import { CheckOrderModal } from './components/CheckOrderModal';
import { KitchenLayout } from './layout';
import orders from './mocks/orders';
import { allOrdersReducer } from './reducers/allOrdersReducer';
import { KitchenContextProps } from './types/KitchenContext';

export const KitchenContext = createContext({} as KitchenContextProps);

export const Kitchen = () => {
  const [isCheckOrderModalOpen, setIsCheckOrderModalOpen] = useState(false);

  const [allOrders, allOrdersDispatch] = useReducer(allOrdersReducer, {
    value: [],
  });

  useEffect(() => {
    allOrdersDispatch({ type: 'ADD-ORDERS', payload: orders });
  }, []);

  return (
    <KitchenContext.Provider
      value={{
        allOrders: allOrders.value,
        allOrdersDispatch,
        setIsCheckOrderModalOpen,
      }}
    >
      <KitchenLayout orders={allOrders.value} />
      <CheckOrderModal
        isModalOpen={isCheckOrderModalOpen}
        setIsModalOpen={setIsCheckOrderModalOpen}
      />
    </KitchenContext.Provider>
  );
};
