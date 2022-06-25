import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import CommandService from 'pages-components/Command/services/CommandService';
import ProductsService from 'pages-components/Command/services/ProductsService';
import { CommandContext } from '../../index';
import { DeleteProductModalLayout } from './layout';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const DeleteProductModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    productIdToDelete,
    productsDispatch,
    command,
    setCommand,
    stockProductsDispatch,
  } = useContext(CommandContext);

  const toast = useToast();

  function handleCloseModal() {
    setIsModalOpen(false);
    setIsDeleting(false);
  }

  async function handleDeleteProduct() {
    // DELETE THE PRODUCT BASED ON ID
    try {
      if (isDeleting) {
        return;
      }
      setIsDeleting(true);

      const newProducts = command?.products?.filter(
        (product) => product._id !== productIdToDelete
      );
      const { command: updatedCommand } = await CommandService.updateCommand({
        _id: command?._id,
        products: newProducts,
      });
      setCommand(updatedCommand);

      productsDispatch({
        type: 'delete',
        payload: { product: { _id: productIdToDelete } },
      });

      // Diminish the amount in stock
      // SOCKET.IO -> say to every device that the amount of this product was decreased in stock
      const productToDelete = command?.products?.filter(
        ({ _id }) => _id === productIdToDelete
      )[0];

      const { product: updatedProduct } = await ProductsService.increaseAmount({
        productId: productIdToDelete,
        amount: productToDelete?.amount as number,
      });

      // Updating the list of stock products in <AddProductModal />
      stockProductsDispatch({
        type: 'UPDATE-ONE-PRODUCT',
        payload: { product: updatedProduct },
      });

      handleCloseModal();
    } catch (error: any) {
      setIsDeleting(false);
      toast.closeAll();
      toast({
        status: 'error',
        isClosable: true,
        duration: 2000,
        title: error?.response?.data?.message,
      });
    }
  }

  return (
    <DeleteProductModalLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      handleDeleteProduct={handleDeleteProduct}
      isDeleting={isDeleting}
    />
  );
};
