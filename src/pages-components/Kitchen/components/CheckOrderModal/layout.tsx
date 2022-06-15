import { Modal } from 'components/Modal';

interface Props {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

export const CheckOrderModalLayout = ({
  isModalOpen,
  handleCloseModal,
}: Props) => (
  <Modal
    isOpen={isModalOpen}
    onClose={handleCloseModal}
    title="Marcar Pedido como Feito"
  >
    <h1>Check Order</h1>
  </Modal>
);
