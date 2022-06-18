import { Button, Flex } from '@chakra-ui/react';
import { Modal } from 'components/Modal';

interface Props {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleCheckOrder: () => void;
  isSending: boolean;
}

export const CheckOrderModalLayout = ({
  isModalOpen,
  handleCloseModal,
  handleCheckOrder,
  isSending,
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
      <Button
        onClick={() => handleCheckOrder()}
        flex="1"
        colorScheme="blue"
        isLoading={isSending}
        loadingText="Enviando"
      >
        Confirmar
      </Button>
    </Flex>
  </Modal>
);
