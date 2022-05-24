import { Modal } from 'components/Modal';

type Props = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
};

export const DeleteProductModalLayout = ({
  isModalOpen,
  handleCloseModal,
}: Props) => (
  <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Deletar Item?">
    <h1>delete</h1>
  </Modal>
);
