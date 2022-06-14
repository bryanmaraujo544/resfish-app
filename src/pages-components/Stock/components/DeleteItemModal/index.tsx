import { SetStateAction, Dispatch, useContext, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { StockContext } from 'pages-components/Stock';
import StockService from '../../services/index';
import { DeleteItemModalLayout } from './layout';

type Props = {
  id: string | number | null;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const DeleteItemModal = ({ id, isModalOpen, setIsModalOpen }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { productsDispatch } = useContext(StockContext);
  const toast = useToast();

  function handleCloseModal() {
    setIsModalOpen(false);
    setIsDeleting(false);
  }

  async function handleDeleteItem() {
    try {
      if (isDeleting) {
        return;
      }
      setIsDeleting(true);
      productsDispatch({ type: 'REMOVE-ONE-PRODUCT', payload: { id } });
      const { message } = await StockService.deleteProduct(id as string);

      toast.closeAll();
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
        title: error?.response.data.message,
        duration: 2000,
      });
    }
  }

  return (
    <DeleteItemModalLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      handleDeleteItem={handleDeleteItem}
      isDeleting={isDeleting}
    />
  );
};
