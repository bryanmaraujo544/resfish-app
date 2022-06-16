import { KitchenContext } from 'pages-components/Kitchen';
import { OrderProduct } from 'pages-components/Kitchen/types/OrderProduct';
import { useContext, useCallback } from 'react';
import { Order as OrderProps } from '../../types/Order';
import { OrderLayout } from './layout';

interface Props {
  order: OrderProps;
}

export const Order = ({ order }: Props) => {
  const { allOrdersDispatch, setIsCheckOrderModalOpen, setOrderToCheck } =
    useContext(KitchenContext);

  function handleCheckOneProduct(product: OrderProduct) {
    allOrdersDispatch({
      type: 'CHECK-ONE-PRODUCT',
      payload: { orderId: order._id, productId: product._id },
    });
  }

  const handleOpenCheckOrderModal = useCallback(
    (orderToCheck: OrderProps) => {
      setIsCheckOrderModalOpen(true);
      setOrderToCheck(orderToCheck);
    },
    [setIsCheckOrderModalOpen, setOrderToCheck]
  );

  return (
    <OrderLayout
      order={order}
      handleCheckOneProduct={handleCheckOneProduct}
      handleOpenCheckOrderModal={handleOpenCheckOrderModal}
    />
  );
};
