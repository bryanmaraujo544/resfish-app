import { Modal } from 'components/Modal';

interface Props {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

export const EditCommandModalLayout = ({
  isModalOpen,
  handleCloseModal,
}: Props) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title="Editar comanda"
    >
      <h1>Edit layout</h1>
    </Modal>
  );
};
