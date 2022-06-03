import { Dispatch, SetStateAction, useContext } from 'react';
import { CommandContext } from '../../index';
import { DeleteProductModalLayout } from './layout';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const DeleteProductModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  const { productIdToDelete, productsDispatch } = useContext(CommandContext);
  console.log('ID TO DELETE', productIdToDelete);

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleDeleteProduct() {
    console.log('delete');
    // DELETE THE PRODUCT BASED ON ID
    productsDispatch({ type: 'delete', payload: { id: productIdToDelete } });
    handleCloseModal();
  }

  return (
    <DeleteProductModalLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      handleDeleteProduct={handleDeleteProduct}
    />
  );
};
