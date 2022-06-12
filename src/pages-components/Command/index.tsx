/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';

import { useToast } from '@chakra-ui/react';
import { Command as CommandType } from 'types/Command';
import { useRouter } from 'next/router';
import { Product } from 'types/Product';
import { productsReducer } from './reducers/productsReducer';
import { AddProductModal } from './components/AddProductModal';
import { DeleteProductModal } from './components/DeleteProductModal';
import { CommandLayout } from './layout';
import CommandService from './services/CommandService';
import { PaymentModal } from './components/PaymentModal';
import ProductsService from './services/ProductsService';
import { stockProductsReducer } from './reducers/stockProductsReducer';
import { DeleteCommandModal } from './components/DeleteCommandModal';

interface StockProductsAction {
  type: 'ADD-ALL-PRODUCTS' | 'UPDATE-ONE-PRODUCT';
  payload: any;
}

interface ContextProps {
  products: { value: any[] };
  productsDispatch: any;
  isDeleteProductModalOpen: boolean;
  setIsDeleteProductModalOpen: Dispatch<SetStateAction<boolean>>;
  productIdToDelete: string;
  setProductIdToDelete: Dispatch<SetStateAction<string>>;
  setIsAddProductModalOpen: Dispatch<SetStateAction<boolean>>;
  handleOpenDeleteModal: ({ productId }: { productId: string }) => void;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  orderBy: string;
  setOrderBy: Dispatch<SetStateAction<string>>;
  orderByDir: 'asc' | 'desc';
  setOrderByDir: Dispatch<SetStateAction<'asc' | 'desc'>>;
  searchContent: string;
  setSearchContent: Dispatch<SetStateAction<string>>;
  command: CommandType;
  setCommand: Dispatch<SetStateAction<CommandType>>;
  stockProductsDispatch: Dispatch<StockProductsAction>;
}

export const CommandContext = createContext({} as ContextProps);

interface Props {
  commandId: string | string[] | undefined;
}

const initialState = {
  value: [] as any[],
};

export const Command = ({ commandId }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [command, setCommand] = useState<CommandType>({} as CommandType);
  const [products, productsDispatch] = useReducer(
    productsReducer,
    initialState
  );

  const [isLoading, setIsLoading] = useState(true);
  const [productIdToDelete, setProductIdToDelete] = useState('');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
    useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDeleteCommandModalOpen, setIsDeleteCommandModalOpen] =
    useState(false);

  const [stockProducts, stockProductsDispatch] = useReducer(
    stockProductsReducer,
    { value: [] as Product[] }
  );
  const [filter, setFilter] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [orderByDir, setOrderByDir] = useState('' as 'asc' | 'desc');
  const [searchContent, setSearchContent] = useState('');

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        // Grab command informations from database
        const { command: commandFound } = await CommandService.getOneCommand({
          commandId,
        });
        setCommand(commandFound);

        productsDispatch({
          type: 'add-products',
          payload: commandFound?.products,
        });

        setIsLoading(false);
        toast.closeAll();
      } catch (error: any) {
        toast({
          status: 'error',
          title: error?.response?.data?.message,
          duration: 2000,
          isClosable: true,
        });
      }
    })();
  }, [commandId, toast]);

  // useEffect to load all of stock products to populate addProductModal
  useEffect(() => {
    (async () => {
      const allProducts = await ProductsService.getAllProducts();
      stockProductsDispatch({ type: 'ADD-ALL-PRODUCTS', payload: allProducts });
    })();
  }, []);

  const handleOpenDeleteModal = useCallback(
    ({ productId }: { productId: string }) => {
      setProductIdToDelete(productId);
      setIsDeleteProductModalOpen(true);
    },
    []
  );

  const handleOpenPaymentModal = useCallback(() => {
    setIsPaymentModalOpen(true);
  }, []);

  const handleGoToCommands = useCallback(() => {
    router.push('/commands');
  }, [router]);

  const handleDeleteCommand = useCallback(() => {
    setIsDeleteCommandModalOpen(true);
  }, []);

  return (
    <CommandContext.Provider
      value={{
        command,
        setCommand,
        productsDispatch,
        products,
        isDeleteProductModalOpen,
        setIsDeleteProductModalOpen,
        setIsAddProductModalOpen,
        productIdToDelete,
        setProductIdToDelete,
        handleOpenDeleteModal,
        filter,
        setFilter,
        orderBy,
        setOrderBy,
        orderByDir,
        setOrderByDir,
        searchContent,
        setSearchContent,
        stockProductsDispatch,
      }}
    >
      <CommandLayout
        command={command}
        isLoading={isLoading}
        handleGoToCommands={handleGoToCommands}
        handleOpenPaymentModal={handleOpenPaymentModal}
        handleDeleteCommand={handleDeleteCommand}
      />
      <DeleteProductModal
        isModalOpen={isDeleteProductModalOpen}
        setIsModalOpen={setIsDeleteProductModalOpen}
      />
      <DeleteCommandModal
        isModalOpen={isDeleteCommandModalOpen}
        setIsModalOpen={setIsDeleteCommandModalOpen}
        command={command}
      />
      <AddProductModal
        isModalOpen={isAddProductModalOpen}
        setIsModalOpen={setIsAddProductModalOpen}
        commandId={command?._id}
        setCommand={setCommand}
        allProducts={stockProducts.value}
        allProductsDispatch={stockProductsDispatch}
      />
      <PaymentModal
        isModalOpen={isPaymentModalOpen}
        setIsModalOpen={setIsPaymentModalOpen}
      />
    </CommandContext.Provider>
  );
};
