import { useContext, useMemo } from 'react';
import { CommandContext } from '..';
import { ProductsListLayout } from './layout';

type Id = { id: string };

export const ProductsList = () => {
  const { products, productsDispatch, handleOpenDeleteModal, filter } =
    useContext(CommandContext);

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
      (product) => product.id === id
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

  const filteredByFilter = useMemo(() => {
    const filtered = products?.value?.filter(
      ({ category }) => category === filter
    );
    return filter ? filtered : products.value;
  }, [filter, products.value]);

  return (
    <ProductsListLayout
      products={filteredByFilter}
      handleIncrementProductAmount={handleIncrementProductAmount}
      handleDecrementProductAmount={handleDecrementProductAmount}
      handleOpenDeleteModal={handleOpenDeleteModal}
    />
  );
};
