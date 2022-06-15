import { Button, Flex } from '@chakra-ui/react';
import { Modal } from 'components/Modal';

interface Props {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSendToKitchen: () => void;
  isSending: boolean;
}

export const SendToKitchenModalLayout = ({
  isModalOpen,
  handleCloseModal,
  handleSendToKitchen,
  isSending,
}: Props) => (
  <Modal
    isOpen={isModalOpen}
    onClose={() => handleCloseModal()}
    title="Mandar para Cozinha?"
  >
    <Flex gap={2}>
      <Button flex={1}>Cancelar</Button>
      <Button
        flex={1}
        colorScheme="blue"
        onClick={() => handleSendToKitchen()}
        isLoading={isSending}
        loadingText="Enviando"
      >
        Mandar
      </Button>
    </Flex>
  </Modal>
);
