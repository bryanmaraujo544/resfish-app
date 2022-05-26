import { Heading } from '@chakra-ui/react';
import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import { NavHeader } from './components/NavHeader';
import { ProductsList } from './components/ProductsList';

type Props = {
  command: any;
};

export const CommandLayout = ({ command }: Props) => {
  console.log('command', command);
  return (
    <Layout>
      <Header />
      <Heading color="blue.800" mb={5} fontSize={[18, 24, 28]}>
        Comanda: {command?.table}
      </Heading>
      <NavHeader />
      <ProductsList />
    </Layout>
  );
};
