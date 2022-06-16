import { Button, Flex } from '@chakra-ui/react';
import { Modal } from 'components/Modal';

interface Props {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleCheckOrder: () => void;
}

export const CheckOrderModalLayout = ({
  isModalOpen,
  handleCloseModal,
  handleCheckOrder,
}: Props) => (
  <Modal
    isOpen={isModalOpen}
    onClose={handleCloseModal}
    title="Marcar Pedido como Feito"
  >
    <Flex gap={3}>
      <Button flex="1" onClick={() => handleCloseModal()}>
        Cancelar
      </Button>
      <Button flex="1" colorScheme="blue" onClick={() => handleCheckOrder()}>
        Confirmar
      </Button>
    </Flex>
  </Modal>
);
