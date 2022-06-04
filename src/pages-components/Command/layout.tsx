import { Heading } from '@chakra-ui/react';
import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import { Command } from 'types/Command';
import { NavHeader } from './components/NavHeader';
import { ProductsList } from './components/ProductsList';

interface Props {
  command: Command;
  isLoading: boolean;
}

export const CommandLayout = ({ command, isLoading }: Props) => (
  <Layout>
    <Header />
    <Heading color="blue.800" mb={5} fontSize={[18, 24, 28]}>
      Comanda: {command?.table}
    </Heading>
    <NavHeader />
    <ProductsList />
  </Layout>
);
