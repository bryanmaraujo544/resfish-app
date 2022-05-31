/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useReducer,
  useState,
  useEffect,
} from 'react';

import StockService from './services/index';
import { StockLayout } from './layout';
import { AddItemModal } from './components/AddItemModal';
import { productsReducer } from './reducers/productsReducer';
import { Product } from './types/Product';

interface Action {
  type:
    | 'ADD-PRODUCTS'
    | 'ADD-ONE-PRODUCT'
    | 'REMOVE-ONE-PRODUCT'
    | 'UPDATE-ONE-PRODUCT';
  payload: any;
}

interface StockContextProps {
  filters: string;
  setFilters: Dispatch<SetStateAction<string>>;
  orderBy: string;
  setOrderBy: Dispatch<SetStateAction<string>>;
  orderByDir: 'asc' | 'desc';
  handleToggleOrderByDir: any;
  searchContent: string;
  setSearchContent: Dispatch<SetStateAction<string>>;
  products: Product[] | [];
  productsDispatch: Dispatch<Action>;
}

export const StockContext = createContext({} as StockContextProps);

export const Stock = () => {
  const [products, productsDispatch] = useReducer(productsReducer, {
    value: [],
  });

  const [filters, setFilters] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [orderByDir, setOrderByDir] = useState<'asc' | 'desc'>('asc');
  const [searchContent, setSearchContent] = useState('');

  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const allProducts = await StockService.getAllProducts();
      productsDispatch({ type: 'ADD-PRODUCTS', payload: allProducts });
    })();
  }, []);

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
        products: products.value,
        productsDispatch,
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
