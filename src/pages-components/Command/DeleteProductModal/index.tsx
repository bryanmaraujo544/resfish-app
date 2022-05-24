import { Dispatch, SetStateAction } from 'react';
import { DeleteProductModalLayout } from './layout';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const DeleteProductModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  console.log('delete');

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <DeleteProductModalLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
    />
  );
};
