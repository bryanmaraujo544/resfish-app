import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import { SetStateAction, Dispatch } from 'react';
import { NavHeader } from './components/NavHeader';
import { ItemsTable } from './components/ItemsTable';

interface Props {
  filters: string;
  setFilters: Dispatch<SetStateAction<string>>;
  orderBy: string;
  setOrderBy: Dispatch<SetStateAction<string>>;
}

export const StockLayout = ({
  filters,
  setFilters,
  orderBy,
  setOrderBy,
}: Props) => {
  console.log('oi');

  return (
    <Layout>
      <Header>'stock'</Header>
      <NavHeader
        filters={filters}
        setFilters={setFilters}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
      <ItemsTable />
    </Layout>
  );
};
