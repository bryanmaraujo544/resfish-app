import { useContext, useState, useMemo, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';

import CommandService from 'pages-components/Command/services/CommandService';
import { formatAmount } from 'utils/formatAmount';
import { Product } from 'types/Product';
import ProductsService from 'pages-components/Command/services/ProductsService';
import { CommandContext } from '../../index';
import { ProductsListLayout } from './layout';
import { PayProductModal } from './PayProductModal';

export const ProductsList = () => {
  const [fishIdToEditAmount, setFishIdToEditAmount] = useState('');
  const [newProductAmount, setNewProductAmount] = useState('');

  const [productToPay, setProductToPay] = useState<Product>({} as Product);
  const [isPayProductModalOpen, setIsPayProductModalOpen] = useState(false);

  const {
    products,
    productsDispatch,
    handleOpenDeleteModal,
    filter,
    orderBy,
    orderByDir,
    setOrderByDir,
    searchContent,
    command,
    setCommand,
    stockProductsDispatch,
  } = useContext(CommandContext);

  const toast = useToast();

  // This function enables the edition of the amount of some fish
  function handleActiveEditFishAmount({
    productId,
    amount,
  }: {
    productId: string;
    amount: string;
  }) {
    setNewProductAmount(
      formatAmount({ num: amount.toString(), to: 'comma' }).toString()
    );
    setFishIdToEditAmount(productId);
  }

  // Function that updates the amount of fish product in fact
  async function handleUpdateFishAmount(
    e: any,
    { productId, isFish }: { productId: string; isFish: boolean }
  ) {
    try {
      e.preventDefault();
      setFishIdToEditAmount('');

      const newAmount = Number(
        isFish
          ? formatAmount({
              num: newProductAmount,
              to: 'point',
            })
          : newProductAmount
      );

      if (Number.isNaN(newAmount)) {
        toast({
          status: 'error',
          title: 'Quantidade inválida',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      if (newAmount < 0) {
        toast({
          status: 'warning',
          title: 'Quantidade menor que 0',
          duration: 2000,
          isClosable: true,
        });
        return;
      }

      const oldProducts = command?.products;
      const newProducts = oldProducts?.map((product) => {
        if (product._id === productId) {
          const newProduct = {
            ...product,
            amount: newAmount as number,
          };
          return newProduct;
        }
        return product;
      });

      const oldProductAmount = oldProducts?.find(
        (product) => product._id === productId
      )?.amount as number;

      if (oldProductAmount > newAmount) {
        // If the amount of product before updated it is less than the newAmount. it means I NEED TO INCREASE THE AMOUNT IN STOCK
        const amountToIncreaseInStock = oldProductAmount - Number(newAmount);
        const { product: stockUpdatedProduct } =
          await ProductsService.increaseAmount({
            productId,
            amount: amountToIncreaseInStock,
          });

        // Updating the AddProductModal list of stock products with new updtedProduc amount
        stockProductsDispatch({
          type: 'UPDATE-ONE-PRODUCT',
          payload: { product: stockUpdatedProduct },
        });
      }

      if (newAmount > oldProductAmount) {
        // it means the amount increased. so I need to DECREASE THE diff between the old amount and new amount in stock
        const amountToDiminishInStock = Number(newAmount) - oldProductAmount;
        const { product: stockUpdatedProduct } =
          await ProductsService.diminishAmount({
            productId,
            amount: amountToDiminishInStock,
          });
        stockProductsDispatch({
          type: 'UPDATE-ONE-PRODUCT',
          payload: { product: stockUpdatedProduct },
        });
      }

      const { command: updatedCommand } = await CommandService.updateCommand({
        _id: command?._id,
        products: newProducts,
      });

      setCommand(updatedCommand);

      productsDispatch({
        type: 'update-product-amount',
        payload: {
          product: {
            id: productId,
            amount: newAmount,
          },
        },
      });
    } catch (error: any) {
      toast({
        status: 'error',
        title: error?.response?.data?.message,
        duration: 3000,
      });
    }
  }

  function handleOpenPayProductModal(product: Product) {
    setIsPayProductModalOpen(true);
    setProductToPay(product);
  }

  // Command Filters Logic

  const handleToggleOrderByDir = useCallback(() => {
    setOrderByDir((prev: string) => (prev === 'asc' ? 'desc' : 'asc'));
  }, [setOrderByDir]);

  const filteredByFilter = useMemo(() => {
    const filtered = products?.value?.filter(
      ({ category }: { category: string }) => category === filter
    );
    return filter ? filtered : products.value;
  }, [filter, products.value]);

  const filteredBySearch = useMemo(() => {
    const filtered = filteredByFilter?.filter((product: any) => {
      const productValuesStr = Object.values(product).join('').toLowerCase();
      if (productValuesStr.includes(searchContent.toLowerCase())) {
        return true;
      }
      return false;
    });
    return filtered;
  }, [filteredByFilter, searchContent]);

  const filteredBySort = useMemo(() => {
    const filtered = filteredBySearch?.sort((a: any, b: any) => {
      if (orderByDir === 'asc') {
        if (a[orderBy] < b[orderBy]) {
          return -1;
        }
        if (b[orderBy] < a[orderBy]) {
          return 1;
        }
        return 0;
      }

      if (a[orderBy] > b[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    });

    return filtered;
  }, [orderByDir, filteredBySearch, orderBy]);

  return (
    <>
      <ProductsListLayout
        products={filteredBySort}
        // handleIncrementProductAmount={handleIncrementProductAmount}
        // handleDecrementProductAmount={handleDecrementProductAmount}
        handleOpenDeleteModal={handleOpenDeleteModal}
        orderBy={orderBy}
        orderByDir={orderByDir}
        handleToggleOrderByDir={handleToggleOrderByDir}
        fishIdToEditAmount={fishIdToEditAmount}
        handleActiveEditFishAmount={handleActiveEditFishAmount}
        handleUpdateFishAmount={handleUpdateFishAmount}
        newProductAmount={newProductAmount}
        setNewProductAmount={setNewProductAmount}
        setFishIdToEditAmount={setFishIdToEditAmount}
        handleOpenPayProductModal={handleOpenPayProductModal}
      />
      <PayProductModal
        isModalOpen={isPayProductModalOpen}
        setIsModalOpen={setIsPayProductModalOpen}
        productToPay={productToPay}
      />
    </>
  );
};
