import { KitchenContext } from 'pages-components/Kitchen';
import { OrderProduct } from 'pages-components/Kitchen/types/OrderProduct';
import { useContext } from 'react';
import { Order as OrderProps } from '../../types/Order';
import { OrderLayout } from './layout';

interface Props {
  order: OrderProps;
}

export const Order = ({ order }: Props) => {
  const { allOrdersDispatch, setIsCheckOrderModalOpen } =
    useContext(KitchenContext);

  function handleCheckOneProduct(product: OrderProduct) {
    allOrdersDispatch({
      type: 'CHECK-ONE-PRODUCT',
      payload: { orderId: order._id, productId: product._id },
    });
  }

  function handleOpenCheckOrderModal() {
    setIsCheckOrderModalOpen(true);
  }

  return (
    <OrderLayout
      order={order}
      handleCheckOneProduct={handleCheckOneProduct}
      handleOpenCheckOrderModal={handleOpenCheckOrderModal}
    />
  );
};
