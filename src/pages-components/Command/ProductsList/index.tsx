import { useContext } from 'react';
import { CommandContext } from '..';
import { ProductsListLayout } from './layout';

export const ProductsList = () => {
  const { products, productsDispatch } = useContext(CommandContext);
  console.log('products list', products);
  // console.log('products list');

  return (
    <ProductsListLayout
      products={products.value}
      productsDispatch={productsDispatch}
    />
  );
};
