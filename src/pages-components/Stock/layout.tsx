import { SetStateAction, Dispatch } from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { MdOutlineAddBox } from 'react-icons/md';

import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import { NavHeader } from './components/NavHeader';
import { ItemsTable } from './components/ItemsTable';

interface Props {
  filters: string;
  setFilters: Dispatch<SetStateAction<string>>;
  orderBy: string;
  setOrderBy: Dispatch<SetStateAction<string>>;
  setIsAddItemModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const StockLayout = ({
  filters,
  setFilters,
  orderBy,
  setOrderBy,
  setIsAddItemModalOpen,
}: Props) => (
  <Layout>
    <Header>
      <Button
        onClick={() => setIsAddItemModalOpen(true)}
        alignItems="center"
        gap={[1, 1, 2]}
        bg="blue.400"
        color="blue.50"
        boxShadow="base"
        fontSize={['sm', 'md', 'lg']}
        fontWeight={600}
        p={[2, 4, 6]}
        _hover={{
          bg: 'blue.500',
          color: 'blue.50',
        }}
        _active={{
          bg: 'blue.400',
          color: 'blue.50',
        }}
        h="100%"
        w="100%"
      >
        <Icon as={MdOutlineAddBox} />
        Adicionar Item
      </Button>
    </Header>
    <NavHeader
      filters={filters}
      setFilters={setFilters}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
    />
    <ItemsTable />
  </Layout>
);
