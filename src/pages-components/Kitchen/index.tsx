/* eslint-disable react/jsx-no-constructed-context-values */
import { useToast } from '@chakra-ui/react';
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import useSound from 'use-sound';
import { SocketContext } from 'pages/_app';

import { Order } from 'types/Order';
import { animateScroll } from 'react-scroll';
import { KitchenLayout } from './layout';
import { allOrdersReducer } from './reducers/allOrdersReducer';
import KitchenOrdersService from './services/KitchenOrdersService';
import { KitchenContextProps } from './types/KitchenContext';

import NotifySound from '../../../public/kitchenalarm.mp3';
import { CheckOrderModal } from './components/CheckOrderModal';

export const KitchenContext = createContext({} as KitchenContextProps);

export const Kitchen = () => {
  const [isCheckOrderModalOpen, setIsCheckOrderModalOpen] = useState(false);
  const [orderToCheck, setOrderToCheck] = useState<Order>({} as Order);

  const [allOrders, allOrdersDispatch] = useReducer(allOrdersReducer, {
    value: [],
  });

  const [playSound, setPlaySound] = useState(false);

  const { socket } = useContext(SocketContext);

  const toast = useToast();
  const [playNotify] = useSound<any>(NotifySound);

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
      allOrdersDispatch({ type: 'ADD-ONE-ORDER', payload: { order: payload } });
      animateScroll.scrollToBottom();
      setPlaySound(true);
    });

    return () => {
      socket.off('kitchen-order-created');
    };
  }, []);

  useEffect(() => {
    if (playSound) {
      console.log('play-sound');
      playNotify();
      setPlaySound(false);
    }
  }, [playSound, playNotify]);

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
