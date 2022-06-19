import { Button, Flex } from '@chakra-ui/react';

import { Modal } from 'components/Modal';

interface Props {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleCloseCashier: () => void;
  isSending: boolean;
}

export const CloseCashierLayout = ({
  isModalOpen,
  handleCloseModal,
  handleCloseCashier,
  isSending,
}: Props) => (
  <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Fechar caixa">
    <Flex gap={[2, 4]}>
      <Button onClick={() => handleCloseModal()} flex="1">
        Cancelar
      </Button>
      <Button
        onClick={() => handleCloseCashier()}
        flex="1"
        colorScheme="blue"
        isLoading={isSending}
        loadingText="Fechando Caixa"
      >
        Confirmar
      </Button>
    </Flex>
  </Modal>
);
