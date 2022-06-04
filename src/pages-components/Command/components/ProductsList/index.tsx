import { useToast } from '@chakra-ui/react';
import CommandService from 'pages-components/Command/services/CommandService';
import { useContext, useMemo, useCallback } from 'react';
import { CommandContext } from '../../index';
import { ProductsListLayout } from './layout';

export const ProductsList = () => {
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
  } = useContext(CommandContext);

  const toast = useToast();

  async function handleIncrementProductAmount({ id }: { id: string }) {
    try {
      // Logic to diminish the amount of this product on the stock
      // Or can diminish the amount of the product only after the paymentd

      // Check if the value of product amount is available
      const oldProducts = command?.products;
      const newProducts = oldProducts?.map((product) => {
        if (product._id === id) {
          const newAmount = product.amount + 1;
          const newProduct = { ...product, amount: newAmount };
          return newProduct;
        }
        return product;
      });

      const { command: updatedCommand } = await CommandService.updateCommand({
        _id: command?._id,
        products: newProducts,
      });

      setCommand(updatedCommand);

      productsDispatch({
        type: 'increment-amount',
        payload: {
          id,
        },
      });
    } catch (error: any) {
      toast({
        status: 'error',
        duration: 2000,
        isClosable: true,
        title: error?.response?.data?.message,
      });
    }
  }

  async function handleDecrementProductAmount({ id }: { id: string }) {
    try {
      const amountOfProduct = products.value.find(
        (product: any) => product._id === id
      ).amount;

      if (amountOfProduct === 1) {
        // Ask if the user wants to delete the product
      }

      if (amountOfProduct > 0) {
        const oldProducts = command?.products;
        const newProducts = oldProducts?.map((product) => {
          if (product._id === id) {
            const newAmount = product.amount - 1;
            const newProduct = { ...product, amount: newAmount };
            return newProduct;
          }
          return product;
        });

        const { command: updatedCommand } = await CommandService.updateCommand({
          _id: command?._id,
          products: newProducts,
        });
        setCommand(updatedCommand);

        productsDispatch({
          type: 'decrement-amount',
          payload: {
            id,
          },
        });
      }
    } catch (error: any) {
      toast({
        status: 'error',
        duration: 2000,
        isClosable: true,
        title: error?.response?.data?.message,
      });
    }
  }

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
    <ProductsListLayout
      products={filteredBySort}
      handleIncrementProductAmount={handleIncrementProductAmount}
      handleDecrementProductAmount={handleDecrementProductAmount}
      handleOpenDeleteModal={handleOpenDeleteModal}
      orderBy={orderBy}
      orderByDir={orderByDir}
      handleToggleOrderByDir={handleToggleOrderByDir}
    />
  );
};
