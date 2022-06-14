import { Flex, Button } from '@chakra-ui/react';
import { Modal } from 'components/Modal';

interface Props {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleDeleteCommand: () => void;
  isDeleting: boolean;
}

export const DeleteCommandModalLayout = ({
  isModalOpen,
  handleCloseModal,
  handleDeleteCommand,
  isDeleting,
}: Props) => (
  <Modal
    isOpen={isModalOpen}
    onClose={handleCloseModal}
    title="Deletar comanda"
  >
    <Flex gap={3}>
      <Button onClick={() => handleCloseModal()} flex="1">
        Cancelar
      </Button>
      <Button
        onClick={() => handleDeleteCommand()}
        flex="1"
        colorScheme="red"
        isLoading={isDeleting}
        loadingText="Deletando"
      >
        Deletar
      </Button>
    </Flex>
  </Modal>
);
