/* eslint-disable no-restricted-globals */
import {
  Dispatch,
  SetStateAction,
  // useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { useToast } from '@chakra-ui/react';

import CommandService from 'pages-components/Command/services/CommandService';
import ProductsService from 'pages-components/Command/services/ProductsService';
// import { CommandContext } from 'pages-components/Command';
import { Command } from 'types/Command';
import { formatAmount } from 'utils/formatAmount';
import { AddProductModalLayout } from './layout';
import { SetAmountModal } from './SetAmountModal';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  commandId: string | undefined;
  setCommand: Dispatch<SetStateAction<Command>>;
}

interface ProductNoAmount {
  _id?: string;
  name: string;
  unitPrice: number;
  category: string;
}

export const AddProductModal = ({
  isModalOpen,
  setIsModalOpen,
  commandId,
  setCommand,
}: Props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([] as any);

  const [isSetAmountModalOpen, setIsSetAmountModalOpen] = useState(false);
  const [productToSetAmount, setProductToSetAmount] = useState<ProductNoAmount>(
    {} as ProductNoAmount
  );
  const [amount, setAmount] = useState('1');

  const [filter, setFilter] = useState('');
  const [searchContent, setSearchContent] = useState('');

  // const { productsDispatch, products: commandProducts } =
  //   useContext(CommandContext);

  const toast = useToast();

  useEffect(() => {
    (async () => {
      const products = await ProductsService.getAllProducts();
      setAllProducts(products);
    })();
  }, []);

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  // This function receives the product infos of the product clicked and opens the modal to select the amount of this
  function handleOpenAmountModal({ product }: { product: ProductNoAmount }) {
    setProductToSetAmount(product);
    setIsSetAmountModalOpen(true);
  }

  // This function add in selected products list. Takes the object with infos based on the click of the user,
  // and add the amount propertie containing the amount selected by the user in modal
  function handleAddProduct(e: any) {
    e.preventDefault();

    // TODO: check if there are enough amount of product selected in stock
    const hasBeenSelected = selectedProducts.some(
      (selectedProduct: any) => selectedProduct.name === productToSetAmount.name
    );
    if (hasBeenSelected) {
      toast({
        title: 'Produto já foi selecionado',
        status: 'warning',
      });
      setIsSetAmountModalOpen(false);
      return;
    }

    const formattedAmount = Number(formatAmount({ num: amount, to: 'point' }));
    if (Number.isNaN(formattedAmount)) {
      toast({
        status: 'error',
        title: 'Número inválido',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setSelectedProducts((prev: any) => [
      ...prev,
      {
        ...productToSetAmount,
        amount: formattedAmount.toString(),
        totalPayed: 0,
      },
    ]);
    setIsSetAmountModalOpen(false);
  }

  function handleRemoveSelectedProduct({ id }: { id: string }) {
    setSelectedProducts((prev: any) =>
      prev.filter((product: any) => product.id !== id)
    );
  }

  async function handleAddProductsInCommand() {
    try {
      // Grab command infos to get the products array and push all of selectedProducts in it.
      const { command } = await CommandService.getOneCommand({ commandId });
      const hasSomeSelectedProductInCommand = command.products.find(
        (product: any) =>
          selectedProducts.some(
            (selectedProduct: any) => selectedProduct.name === product.name
          )
      );

      if (hasSomeSelectedProductInCommand) {
        toast({
          title: `O produto: ${hasSomeSelectedProductInCommand.name} já está na comanda`,
          status: 'error',
        });
        return;
      }

      const newProducts = [...command.products, ...selectedProducts];

      // ADD THIS PRODUCTS IN COMMAND IN MONGODB DATABASE
      const { command: updatedCommand } = await CommandService.updateCommand({
        _id: commandId,
        products: newProducts,
      });

      setCommand(updatedCommand);

      location.reload();

      cleanModalValues();

      // TODO: Broadcast to necessary entities the update of command

      toast.closeAll();
      toast({
        status: 'success',
        title: 'Produtos adicionados',
        duration: 2000,
        isClosable: true,
      });
      handleCloseModal();
    } catch (error: any) {
      toast({
        status: 'error',
        title: error?.response?.data?.message,
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const cleanModalValues = useCallback(() => {
    setSelectedProducts([]);
    setAmount('1');
    setFilter('');
    setSearchContent('');
  }, []);

  function handleChangeFilter(selectedFilter: string) {
    setFilter((prevFilter) => {
      if (selectedFilter === prevFilter) {
        return '';
      }
      return selectedFilter;
    });
  }

  const filteredByFilter = useMemo(() => {
    if (filter === '') {
      return allProducts;
    }
    const filtered = allProducts.filter(({ category }) => category === filter);
    return filtered;
  }, [filter, allProducts]);

  const filteredBySearch = useMemo(() => {
    const filtered = filteredByFilter.filter((product: any) => {
      const productObjStr = Object.values(product).join('').toLocaleLowerCase();
      if (productObjStr.includes(searchContent.toLowerCase())) {
        return true;
      }
      return false;
    });
    return filtered;
  }, [filteredByFilter, searchContent]);

  return (
    <>
      <AddProductModalLayout
        products={filteredBySearch}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        selectedProducts={selectedProducts}
        handleOpenAmountModal={handleOpenAmountModal}
        handleRemoveSelectedProduct={handleRemoveSelectedProduct}
        handleAddProductsInCommand={handleAddProductsInCommand}
        filter={filter}
        handleChangeFilter={handleChangeFilter}
        searchContent={searchContent}
        setSearchContent={setSearchContent}
      />
      {/* Set amount of product modal */}
      <SetAmountModal
        isSetAmountModalOpen={isSetAmountModalOpen}
        setIsSetAmountModalOpen={setIsSetAmountModalOpen}
        amount={amount}
        setAmount={setAmount}
        handleAddProduct={handleAddProduct}
        isFishesCategory={
          productToSetAmount?.category?.toLowerCase() === 'peixes'
        }
      />
    </>
  );
};
