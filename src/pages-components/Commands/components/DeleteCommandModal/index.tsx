import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useToast } from '@chakra-ui/react';

import CommandsService from 'pages-components/Commands/services/CommandsService';
import ProductsService from 'pages-components/Commands/services/ProductsService';
import { CommandsContext } from 'pages-components/Commands';
import { Product } from 'types/Product';
import KitchenService from 'pages-components/Commands/services/KitchenService';
import { DeleteCommandModalLayout } from './layout';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  commandId: string;
}

export const DeleteCommandModal = ({
  isModalOpen,
  setIsModalOpen,
  commandId,
}: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const { allCommandsDispatch, stockProductsDispatch } =
    useContext(CommandsContext);
  const toast = useToast();

  function handleCloseModal() {
    setIsModalOpen(false);
    setIsDeleting(false);
  }

  const handleDeleteCommand = useCallback(async () => {
    if (!commandId) {
      throw new Error('Any commandId was informed');
    }

    try {
      if (isDeleting) {
        return;
      }
      setIsDeleting(true);

      const { command } = await CommandsService.getOneCommand({ commandId });
      const commandProducts = command.products;
      commandProducts.forEach((product: Product) => {
        (async () => {
          const { product: updatedProduct } =
            await ProductsService.increaseAmount({
              productId: product._id,
              amount: product.amount,
            });

          if (updatedProduct) {
            stockProductsDispatch({
              type: 'UPDATE-ONE-PRODUCT',
              payload: { product: updatedProduct },
            });
          }
        })();
      });

      const { message } = await CommandsService.deleteCommand(commandId);
      allCommandsDispatch({
        type: 'REMOVE-ONE-COMMAND',
        payload: { commandId },
      });

      await KitchenService.deleteOrdersOfCommand({ commandId });

      toast({
        status: 'success',
        title: message,
        duration: 2000,
        isClosable: true,
      });
      handleCloseModal();
    } catch (error: any) {
      setIsDeleting(false);
      toast.closeAll();
      toast({
        status: 'error',
        title: error?.response?.data?.message || '',
        duration: 2000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commandId, allCommandsDispatch]);

  return (
    <DeleteCommandModalLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      handleDeleteCommand={handleDeleteCommand}
      isDeleting={isDeleting}
    />
  );
};
