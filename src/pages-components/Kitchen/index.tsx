/* eslint-disable react/jsx-no-constructed-context-values */
import { useToast } from '@chakra-ui/react';
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { SocketContext } from 'pages/_app';
import { CheckOrderModal } from './components/CheckOrderModal';
import { KitchenLayout } from './layout';
// import orders from './mocks/orders';
import { allOrdersReducer } from './reducers/allOrdersReducer';
import KitchenOrdersService from './services/KitchenOrdersService';
import { KitchenContextProps } from './types/KitchenContext';
import { Order } from '../../types/Order';

export const KitchenContext = createContext({} as KitchenContextProps);

export const Kitchen = () => {
  const [isCheckOrderModalOpen, setIsCheckOrderModalOpen] = useState(false);
  const [orderToCheck, setOrderToCheck] = useState<Order>({} as Order);

  const [allOrders, allOrdersDispatch] = useReducer(allOrdersReducer, {
    value: [],
  });

  const { socket } = useContext(SocketContext);

  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        const orders = await KitchenOrdersService.gelAll();
        allOrdersDispatch({ type: 'ADD-ORDERS', payload: orders });
      } catch (error: any) {
        toast({
          status: 'error',
          title: 'Recarregue a página',
          duration: 2000,
          isClosable: true,
        });
      }
    })();
  }, []);

  useEffect(() => {
    socket.once('kitchen-order-created', (payload: any) => {
      console.log(payload);
      allOrdersDispatch({ type: 'ADD-ONE-ORDER', payload: { order: payload } });
    });

    return () => {
      socket.off('kitchen-order-created');
    };
  }, []);

  return (
    <KitchenContext.Provider
      value={{
        allOrders: allOrders.value,
        allOrdersDispatch,
        setIsCheckOrderModalOpen,
        setOrderToCheck,
      }}
    >
      <KitchenLayout orders={allOrders.value} />
      <CheckOrderModal
        isModalOpen={isCheckOrderModalOpen}
        setIsModalOpen={setIsCheckOrderModalOpen}
        order={orderToCheck}
      />
    </KitchenContext.Provider>
  );
};
