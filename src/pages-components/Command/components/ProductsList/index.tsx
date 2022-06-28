import { useContext, useState, useMemo, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';

import CommandService from 'pages-components/Command/services/CommandService';
import { formatAmount } from 'utils/formatAmount';
import { Product } from 'types/Product';
import ProductsService from 'pages-components/Command/services/ProductsService';
import { CommandContext } from '../../index';
import { ProductsListLayout } from './layout';
import { PayProductModal } from './PayProductModal';

interface AmountProduct {
  _id: string;
  unitPrice: number;
  totalPayed: number;
  amount: number;
}

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
  async function handleUpdateProductAmount(
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
        duration: 2000,
        isClosable: true,
      });
    }
  }

  function handleOpenPayProductModal(product: Product) {
    setIsPayProductModalOpen(true);
    setProductToPay(product);
  }

  const handleIncrementProductAmount = useCallback(
    async ({ productId, amount }: { productId: string; amount: number }) => {
      try {
        // TODO: Verify if amount in stock is available
        const { isInStock } = await ProductsService.verifyAmount({
          productId,
          amount: amount - (amount - 1),
        });
        if (!isInStock) {
          return;
        }

        productsDispatch({
          type: 'increment-amount',
          payload: { id: productId },
        });

        // Save the update in command
        const newProducts = command?.products?.map((product: Product) => {
          if (product._id === productId) {
            const newProduct = {
              ...product,
              amount: amount + 1,
            };
            return newProduct;
          }
          return product;
        });

        const { command: updatedCommand } = await CommandService.updateCommand({
          _id: command?._id as string,
          products: newProducts,
        });
        setCommand(updatedCommand);

        // Decreasing the amount of this product in stock
        const { product: stockUpdatedProduct } =
          await ProductsService.diminishAmount({
            productId,
            amount: 1,
          });
        if (stockUpdatedProduct) {
          stockProductsDispatch({
            type: 'UPDATE-ONE-PRODUCT',
            payload: { product: stockUpdatedProduct },
          });
        }
      } catch (err: any) {
        toast.closeAll();
        toast({
          status: 'error',
          title: err?.response?.data?.message,
          duration: 1000,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productsDispatch, command]
  );

  const handleDecrementProductAmount = useCallback(
    async (product: AmountProduct) => {
      try {
        const productId = product?._id;
        // TODO: verify if when I'm decrementing the total will be less than total payed
        const total =
          Math.round(
            (product.amount * product.unitPrice + Number.EPSILON) * 100
          ) / 100;

        const newAmount = product.amount - 1;
        if (newAmount < 0) {
          toast.closeAll();
          toast({
            status: 'error',
            duration: 1000,
            isClosable: true,
            title: 'Quantidade menor que 0',
          });
          return;
        }

        if (total - product.unitPrice < product.totalPayed) {
          toast.closeAll();
          toast({
            status: 'warning',
            title:
              'Abaixando a quantidade, o total do produto seria menor do que já foi pago',
          });
          return;
        }

        // Save the update in command
        const newProducts = command?.products?.map((prod: Product) => {
          if (prod._id === productId) {
            const newProduct = {
              ...prod,
              amount: product.amount - 1,
            };
            return newProduct;
          }
          return prod;
        });
        const { command: updatedCommand } = await CommandService.updateCommand({
          _id: command?._id as string,
          products: newProducts,
        });

        // I'm already receiving the updated version of socket event -> so I don't need to udpate in fr
        // productsDispatch({
        //   type: 'decrement-amount',
        //   payload: { id: productId },
        // });
        setCommand(updatedCommand);

        // Decreasing the amount of this product in stock
        const { product: stockUpdatedProduct } =
          await ProductsService.increaseAmount({
            productId,
            amount: 1,
          });
        if (stockUpdatedProduct) {
          stockProductsDispatch({
            type: 'UPDATE-ONE-PRODUCT',
            payload: { product: stockUpdatedProduct },
          });
        }
      } catch (err: any) {
        toast.closeAll();
        toast({
          status: 'error',
          title: err?.response?.data?.message,
          duration: 1000,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productsDispatch, command]
  );

  //
  // ==================== Command Filters Logic ==================== //
  //

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
        handleUpdateProductAmount={handleUpdateProductAmount}
        newProductAmount={newProductAmount}
        setNewProductAmount={setNewProductAmount}
        setFishIdToEditAmount={setFishIdToEditAmount}
        handleOpenPayProductModal={handleOpenPayProductModal}
        handleIncrementProductAmount={handleIncrementProductAmount}
        handleDecrementProductAmount={handleDecrementProductAmount}
      />
      <PayProductModal
        isModalOpen={isPayProductModalOpen}
        setIsModalOpen={setIsPayProductModalOpen}
        productToPay={productToPay}
      />
    </>
  );
};
