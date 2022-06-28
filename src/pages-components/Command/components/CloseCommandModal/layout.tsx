import { Modal } from 'components/Modal';

interface Props {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

export const CloseCommandModalLayout = ({
  isModalOpen,
  handleCloseModal,
}: Props) => {
  console.log('close command');

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title="Fechar Comanda"
    >
      <h1>fechar comanda</h1>
    </Modal>
  );
};
