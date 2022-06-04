import { useToast } from '@chakra-ui/react';
import CommandService from 'pages-components/Command/services/CommandService';
import { Dispatch, SetStateAction, useContext } from 'react';
import { CommandContext } from '../../index';
import { DeleteProductModalLayout } from './layout';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const DeleteProductModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  const { productIdToDelete, productsDispatch, command } =
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

      await CommandService.updateCommand({
        _id: command._id,
        products: newProducts,
      });

      productsDispatch({
        type: 'delete',
        payload: { product: { _id: productIdToDelete } },
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
