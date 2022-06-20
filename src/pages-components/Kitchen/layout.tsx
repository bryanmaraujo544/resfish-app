import { Heading } from '@chakra-ui/react';
import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import { OrdersList } from './components/OrdersList';
import { Order } from '../../types/Order';

interface Props {
  orders: Order[];
}

export const KitchenLayout = ({ orders }: Props) => (
  <Layout>
    <Header />
    <Heading color="blue.800" fontSize={[16, 20, 24, 28]}>
      Cozinha
    </Heading>
    <OrdersList orders={orders} />
  </Layout>
);
