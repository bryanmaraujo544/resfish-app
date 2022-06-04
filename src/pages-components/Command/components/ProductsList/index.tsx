import { useContext, useMemo, useCallback } from 'react';
import { CommandContext } from '../../index';
import { ProductsListLayout } from './layout';

type Id = { id: string };

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
  } = useContext(CommandContext);

  function handleIncrementProductAmount({ id }: Id) {
    // Logic to diminish the amount of this product on the stock
    // Or can diminish the amount of the product only after the paymentd
    productsDispatch({
      type: 'increment-amount',
      payload: {
        id,
      },
    });
  }

  function handleDecrementProductAmount({ id }: Id) {
    const amountOfProduct = products.value.find(
      (product: any) => product._id === id
    ).amount;

    if (amountOfProduct === 1) {
      // Ask if the user wants to delete the product
    }

    if (amountOfProduct > 0) {
      productsDispatch({
        type: 'decrement-amount',
        payload: {
          id,
        },
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

  console.log({ filteredBySort });

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
