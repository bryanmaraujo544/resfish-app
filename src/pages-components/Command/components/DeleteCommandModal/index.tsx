import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import CommandService from 'pages-components/Command/services/CommandService';
import ProductsService from 'pages-components/Command/services/ProductsService';
import { Product } from 'types/Product';
import { Command } from 'types/Command';
import { useRouter } from 'next/router';
import KitchenService from 'pages-components/Command/services/KitchenService';
import { DeleteCommandModalLayout } from './layout';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  command: Command;
}

export const DeleteCommandModal = ({
  isModalOpen,
  setIsModalOpen,
  command,
}: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const toast = useToast();
  const router = useRouter();

  function handleCloseModal() {
    setIsModalOpen(false);
    setIsDeleting(false);
  }

  const commandId = command?._id as string;

  const handleDeleteCommand = useCallback(async () => {
    try {
      if (!command?._id) {
        throw new Error('Any commandId was informed');
      }

      if (isDeleting) {
        return;
      }
      setIsDeleting(true);

      if (command?.isActive === true) {
        const commandProducts = command?.products as Product[];
        commandProducts.forEach((product: Product) => {
          (async () => {
            await ProductsService.increaseAmount({
              productId: product._id,
              amount: product.amount,
            });
          })();
        });
      }

      const { message } = await CommandService.deleteCommand({ commandId });

      await KitchenService.deleteOrdersOfCommand({ commandId });

      toast({
        status: 'success',
        title: message,
        duration: 2000,
        isClosable: true,
      });
      handleCloseModal();
      router.push('/commands');
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
  }, [commandId, command]);

  return (
    <DeleteCommandModalLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      handleDeleteCommand={handleDeleteCommand}
      isDeleting={isDeleting}
    />
  );
};
