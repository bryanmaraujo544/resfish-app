import { Heading } from '@chakra-ui/react';
import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import { NavHeader } from './NavHeader';
import { ProductsList } from './ProductsList';

type Props = {
  command: any;
};

export const CommandLayout = ({ command }: Props) => {
  console.log('command', command);
  return (
    <Layout>
      <Header />
      <Heading color="blue.800">Comanda: {command?.table}</Heading>
      <NavHeader />
      <ProductsList />
    </Layout>
  );
};
