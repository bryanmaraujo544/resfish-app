import { useToast } from '@chakra-ui/react';
import { KitchenContext } from 'pages-components/Kitchen';
import { Order } from 'pages-components/Kitchen/types/Order';
import { Dispatch, SetStateAction, useCallback, useContext } from 'react';
import { CheckOrderModalLayout } from './layout';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  order: Order;
}

export const CheckOrderModal = ({
  isModalOpen,
  setIsModalOpen,
  order,
}: Props) => {
  const { allOrdersDispatch } = useContext(KitchenContext);

  const toast = useToast();

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const handleCheckOrder = useCallback(() => {
    console.log('handleCheckOrder', order);

    // TODO -> remove the order of kicthen page
    allOrdersDispatch({
      type: 'REMOVE-ONE-ORDER',
      payload: { order: { _id: order._id } },
    });

    // TODO -> alert to home page that this food order is complete

    toast.closeAll();
    toast({
      status: 'success',
      title: 'Pedido finalizado!',
      duration: 1000,
      isClosable: true,
    });

    handleCloseModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  return (
    <CheckOrderModalLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      handleCheckOrder={handleCheckOrder}
    />
  );
};
