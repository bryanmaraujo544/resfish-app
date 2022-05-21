/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { StockLayout } from './layout';
import { AddItemModal } from './components/AddItemModal';

type StockContextProps = {
  filters: string;
  setFilters: Dispatch<SetStateAction<string>>;
  orderBy: string;
  setOrderBy: Dispatch<SetStateAction<string>>;
  orderByDir: 'asc' | 'desc';
  handleToggleOrderByDir: any;
  searchContent: string;
  setSearchContent: Dispatch<SetStateAction<string>>;
};

export const StockContext = createContext({} as StockContextProps);

export const Stock = () => {
  const [filters, setFilters] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [orderByDir, setOrderByDir] = useState<'asc' | 'desc'>('asc');
  const [searchContent, setSearchContent] = useState('');

  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  useEffect(() => {
    if (orderByDir === 'asc') {
      console.log({ orderBy, orderByDir });
      return;
    }

    console.log('é desc', { orderBy, orderByDir });
  }, [orderByDir, orderBy]);

  const handleToggleOrderByDir = useCallback(
    () => setOrderByDir((prev) => (prev === 'asc' ? 'desc' : 'asc')),
    []
  );

  return (
    <StockContext.Provider
      value={{
        filters,
        setFilters,
        orderBy,
        setOrderBy,
        orderByDir,
        handleToggleOrderByDir,
        searchContent,
        setSearchContent,
      }}
    >
      <AddItemModal
        isAddItemModalOpen={isAddItemModalOpen}
        setIsAddItemModalOpen={setIsAddItemModalOpen}
      />
      <StockLayout
        filters={filters}
        setFilters={setFilters}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        setIsAddItemModalOpen={setIsAddItemModalOpen}
      />
    </StockContext.Provider>
  );
};
