import { useToast } from '@chakra-ui/react';
import { CommandContext } from 'pages-components/Command';
import { Dispatch, SetStateAction, useContext, useState, useMemo } from 'react';
import { AddProductModalLayout } from './layout';
import { SetAmountModal } from './SetAmountModal';

const mockProducts = [
  {
    image:
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
    name: 'Pesque-Pague',
    category: 'Pesca',
    amount: null,
    unitPrice: 0,
    id: Math.random().toFixed(4),
  },
  {
    image:
      'https://user-images.githubusercontent.com/62571814/168487287-6b0c1c98-d2d6-4827-87dd-998048561057.png',
    name: 'Pesca Esportiva',
    category: 'Pesca',
    amount: null,
    unitPrice: 25.9,
    id: Math.random().toFixed(4),
  },
  {
    image:
      'https://user-images.githubusercontent.com/62571814/168487287-6b0c1c98-d2d6-4827-87dd-998048561057.png',
    name: 'Coca-Cola',
    category: 'Bebidas',
    amount: 56,
    unitPrice: 7.9,
    id: Math.random().toFixed(4),
  },
];

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddProductModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  const [selectedProducts, setSelectedProducts] = useState([] as any);

  const [isSetAmountModalOpen, setIsSetAmountModalOpen] = useState(false);
  const [productToSetAmount, setProductToSetAmount] = useState({} as any);
  const [amount, setAmount] = useState(1);

  const [filter, setFilter] = useState('');
  const [searchContent, setSearchContent] = useState('');

  const { productsDispatch, products: commandProducts } =
    useContext(CommandContext);
  const toast = useToast();

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  // This function receives the product infos of the product clicked and opens the modal to select the amount of this
  function handleOpenAmountModal({ product }: { product: any }) {
    setProductToSetAmount(product);
    setIsSetAmountModalOpen(true);
  }

  // This function add in selected products list. Takes the object with infos based on the click of the user,
  // and add the amount propertie containing the amount selected by the user in modal
  function handleAddProduct() {
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
    setSelectedProducts((prev: any) => [
      ...prev,
      { ...productToSetAmount, amount },
    ]);
    setIsSetAmountModalOpen(false);
  }

  function handleRemoveSelectedProduct({ id }: { id: string }) {
    setSelectedProducts((prev: any) =>
      prev.filter((product: any) => product.id !== id)
    );
  }

  function handleAddProductsInCommand() {
    const hasSomeSelectedProductInCommand = commandProducts.value.find(
      (product) =>
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
    selectedProducts.forEach((product: any) => {
      productsDispatch({ type: 'add', payload: product });
    });
    handleCloseModal();
  }

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
      return mockProducts;
    }
    const filtered = mockProducts.filter(({ category }) => category === filter);
    return filtered;
  }, [filter]);

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
      />
    </>
  );
};
