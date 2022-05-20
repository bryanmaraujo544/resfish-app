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
import { EditModal } from './components/EditModal';
import type { Item } from './types/Item';

type StockContextProps = {
  filters: string;
  setFilters: Dispatch<SetStateAction<string>>;
  orderBy: string;
  setOrderBy: Dispatch<SetStateAction<string>>;
  orderByDir: 'asc' | 'desc';
  handleToggleOrderByDir: any;
  handleOpenEditModal: any;
  searchContent: string;
  setSearchContent: Dispatch<SetStateAction<string>>;
};

export const StockContext = createContext({} as StockContextProps);

export const Stock = () => {
  const [id, setId] = useState(null as null | number | string);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(null as null | number);
  const [unitPrice, setUnitPrice] = useState('R$');

  const [filters, setFilters] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [orderByDir, setOrderByDir] = useState<'asc' | 'desc'>('asc');
  const [searchContent, setSearchContent] = useState('');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (orderByDir === 'asc') {
      console.log({ orderBy, orderByDir });
      return;
    }

    console.log('é desc', { orderBy, orderByDir });
  }, [orderByDir, orderBy]);

  const handleOpenEditModal = useCallback((itemInfos: Item) => {
    setId(itemInfos.id);
    setName(itemInfos.name);
    setImage(itemInfos.image);
    setAmount(itemInfos.amount);
    setUnitPrice(`R$ ${itemInfos.unitPrice.toString()}`);
    setCategory(itemInfos.category);

    setIsEditModalOpen(true);
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
        handleOpenEditModal,
        searchContent,
        setSearchContent,
      }}
    >
      <EditModal
        itemInfos={{
          id,
          name,
          image,
          amount,
          unitPrice,
          setName,
          setImage,
          setAmount,
          setUnitPrice,
          category,
          setCategory,
        }}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />
      <StockLayout
        filters={filters}
        setFilters={setFilters}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
    </StockContext.Provider>
  );
};
