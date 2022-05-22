import { SetStateAction, Dispatch } from 'react';
import { DeleteItemModalLayout } from './layout';

type Props = {
  id: string | number | null;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const DeleteItemModal = ({ id, isModalOpen, setIsModalOpen }: Props) => {
  console.log('delete', id);

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleDeleteItem() {
    console.log(`Item with the id: ${id} was deleted`);
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
