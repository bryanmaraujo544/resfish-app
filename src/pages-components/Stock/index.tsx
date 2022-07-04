/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useReducer,
  useState,
  useEffect,
  useContext,
} from 'react';

import { useRouter } from 'next/router';
import { SocketContext } from 'pages/_app';
import { downloadFile } from 'utils/downloadFile';
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
    | 'UPDATE-ONE-PRODUCT'
    | 'FAVORITE-PRODUCT'
    | 'UNFAVORITE-PRODUCT';
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
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(true);

  const { socket } = useContext(SocketContext);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const allProducts = await StockService.getAllProducts();
      setIsLoading(false);
      productsDispatch({ type: 'ADD-PRODUCTS', payload: allProducts });
    })();
  }, []);

  useEffect(() => {
    socket.on('product-updated', (updatedProduct: Product) => {
      productsDispatch({
        type: 'UPDATE-ONE-PRODUCT',
        payload: { product: updatedProduct },
      });
    });

    return () => {
      socket.off('product-updated');
    };
  }, []);

  const handleToggleOrderByDir = useCallback(
    () => setOrderByDir((prev) => (prev === 'asc' ? 'desc' : 'asc')),
    []
  );

  function handleDownload(e: any) {
    e.preventDefault();
    downloadFile({
      data: JSON.stringify(products),
      fileName: 'produtos-do-estoque.json',
      fileType: 'text/json',
    });
  }

  function handleGoToHome() {
    router.push('/');
  }

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
        isLoading,
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
        handleGoToHome={handleGoToHome}
        handleDownload={handleDownload}
      />
    </StockContext.Provider>
  );
};
