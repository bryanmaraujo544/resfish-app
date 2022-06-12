import { useToast } from '@chakra-ui/react';
import CommandService from 'pages-components/Command/services/CommandService';
import ProductsService from 'pages-components/Command/services/ProductsService';
import { Dispatch, SetStateAction, useContext } from 'react';
import { CommandContext } from '../../index';
import { DeleteProductModalLayout } from './layout';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const DeleteProductModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  const { productIdToDelete, productsDispatch, command, setCommand } =
    useContext(CommandContext);

  const toast = useToast();

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  async function handleDeleteProduct() {
    // DELETE THE PRODUCT BASED ON ID
    try {
      const newProducts = command?.products?.filter(
        (product) => product._id !== productIdToDelete
      );

      const { command: updatedCommand } = await CommandService.updateCommand({
        _id: command._id,
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
      await ProductsService.increaseAmount({
        productId: productIdToDelete,
        amount: productToDelete?.amount as number,
      });

      handleCloseModal();
    } catch (error: any) {
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
    />
  );
};
