import { Dispatch, SetStateAction, useCallback } from 'react';
import { CheckOrderModalLayout } from './layout';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const CheckOrderModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  return (
    <CheckOrderModalLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
    />
  );
};
