import { SetStateAction, Dispatch } from 'react';
import { EditModalLayout } from './layout';
import type { Item } from '../../types/Item';

interface Props {
  itemInfos: Item;
  isEditModalOpen: boolean;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const EditModal = ({
  itemInfos,
  isEditModalOpen,
  setIsEditModalOpen,
}: Props) => {
  function handleSubmit(e: any) {
    e.preventDefault();

    // TODO: update the globalState
    console.log(itemInfos);
  }

  function onClose() {
    setIsEditModalOpen(false);
  }

  return (
    <EditModalLayout
      title="Editar Item"
      isEditModalOpen={isEditModalOpen}
      onClose={onClose}
      itemInfos={itemInfos}
      handleSubmit={handleSubmit}
    />
  );
};
