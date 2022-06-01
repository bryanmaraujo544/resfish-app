import { Dispatch, SetStateAction } from 'react';
import { EditCommandModalLayout } from './layout';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  commandId: string;
}

export const EditCommandModal = ({
  isModalOpen,
  setIsModalOpen,
  commandId,
}: Props) => {
  console.log({ commandId });

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <EditCommandModalLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
    />
  );
};
