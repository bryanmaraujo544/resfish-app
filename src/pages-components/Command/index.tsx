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
import { DeleteProductModal } from './DeleteProductModal';
import { CommandLayout } from './layout';

const mockCommands = [
  {
    id: 2,
    table: 'João Gomes',
    waiter: 'Diego',
    total: 458.9,
    products: [
      {
        id: 'coca123',
        name: 'Coca-Cola',
        category: 'Bebidas',
        amount: 5,
        unitPrice: 7.9,
      },
      {
        id: 'fritas123',
        name: 'Porção Batata Frita',
        category: 'Porções',
        amount: 2,
        unitPrice: 32.5,
      },
      {
        id: 'peixe123',
        name: 'Peixe Baiacu',
        category: 'Peixes',
        amount: 3,
        unitPrice: 24.5,
      },
    ],
  },
  {
    id: 3,
    table: 'João Gomes',
    waiter: 'Diego',
    total: 458.9,
  },
  {
    id: 4,
    table: 'Mbappé',
    waiter: 'Diego',
    total: 4580.9,
  },
  {
    id: 5,
    table: 'Neymar',
    waiter: 'Júlio',
    total: 1259.9,
  },
  {
    id: 6,
    table: 'Amanda vermelho',
    waiter: 'Bryan',
    total: 458.9,
  },
  {
    id: 7,
    table: 'João Gomes',
    waiter: 'Diego',
    total: 358.9,
  },
];

type ContextProps = {
  products: { value: any[] };
  productsDispatch: any;
  isDeleteProductModalOpen: boolean;
  setIsDeleteProductModalOpen: Dispatch<SetStateAction<boolean>>;
  productIdToDelete: string;
  setProductIdToDelete: Dispatch<SetStateAction<string>>;
  // eslint-disable-next-line no-unused-vars
  handleOpenDeleteModal: ({ productId }: { productId: string }) => void;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  orderBy: string;
  setOrderBy: Dispatch<SetStateAction<string>>;
  orderByDir: string;
  setOrderByDir: Dispatch<SetStateAction<string>>;
  searchContent: string;
  setSearchContent: Dispatch<SetStateAction<string>>;
};

export const CommandContext = createContext({} as ContextProps);

type Props = {
  commandId: string | string[] | undefined;
};

const initialState = {
  value: [] as any[],
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'add-products': {
      return { value: action.payload };
    }
    case 'add':
      return { value: [...state.value, action.payload] };
    case 'increment-amount': {
      const newState = state.value.map((product: any) => {
        if (product.id === action.payload.id) {
          return { ...product, amount: product.amount + 1 };
        }
        return product;
      });
      return { value: [...newState] };
    }
    case 'decrement-amount': {
      const newState = state.value.map((product: any) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            amount: product.amount > 0 ? product.amount - 1 : product.amount,
          };
        }
        return product;
      });
      return { value: [...newState] };
    }
    case 'delete': {
      console.log('DELETE DISPATCH WAS CALLED', action);
      const newState = state.value.filter(
        (product: any) => product.id !== action.payload.id
      );
      return { value: newState };
    }
    default:
      throw new Error('This type is invalid');
  }
};

export const Command = ({ commandId }: Props) => {
  const [command, setCommand] = useState({});
  const [products, productsDispatch] = useReducer(reducer, initialState);

  const [productIdToDelete, setProductIdToDelete] = useState('');

  const [filter, setFilter] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [orderByDir, setOrderByDir] = useState('');
  const [searchContent, setSearchContent] = useState('');

  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
    useState(false);

  useEffect(() => {
    const [commandFound] = mockCommands.filter(
      ({ id }) => id.toString() === commandId
    );
    setCommand(commandFound);

    productsDispatch({ type: 'add-products', payload: commandFound?.products });
  }, [commandId]);

  // Create the context to share the value of product id to delete and function
  // to open modal and assing these values based on product clicked

  const handleOpenDeleteModal = useCallback(
    ({ productId }: { productId: string }) => {
      setProductIdToDelete(productId);
      setIsDeleteProductModalOpen(true);
    },
    []
  );

  return (
    <CommandContext.Provider
      value={{
        productsDispatch,
        products,
        isDeleteProductModalOpen,
        setIsDeleteProductModalOpen,
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
      }}
    >
      <CommandLayout command={command} />
      <DeleteProductModal
        isModalOpen={isDeleteProductModalOpen}
        setIsModalOpen={setIsDeleteProductModalOpen}
      />
    </CommandContext.Provider>
  );
};
