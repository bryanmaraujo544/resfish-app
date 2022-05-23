import { ProductsListLayout } from './layout';

export const ProductsList = ({ products }: any) => {
  console.log('products list');
  console.log({ products });

  return <ProductsListLayout products={products} />;
};
