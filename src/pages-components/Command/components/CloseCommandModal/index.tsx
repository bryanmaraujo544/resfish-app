import { Dispatch, SetStateAction } from 'react';
import { CloseCommandModalLayout } from './layout';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const CloseCommandModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <CloseCommandModalLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
    />
  );
};
