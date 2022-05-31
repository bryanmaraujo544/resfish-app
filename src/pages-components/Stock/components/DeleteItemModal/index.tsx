import { SetStateAction, Dispatch, useContext } from 'react';
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
  const { productsDispatch } = useContext(StockContext);
  const toast = useToast();

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  async function handleDeleteItem() {
    productsDispatch({ type: 'REMOVE-ONE-PRODUCT', payload: { id } });
    const { message } = await StockService.deleteProduct(id as string);

    toast({
      status: 'success',
      title: message,
      duration: 2000,
      isClosable: true,
    });

    handleCloseModal();
  }

  return (
    <DeleteItemModalLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      handleDeleteItem={handleDeleteItem}
    />
  );
};
