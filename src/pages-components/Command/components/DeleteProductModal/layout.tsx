import { Flex, Button } from '@chakra-ui/react';
import { Modal } from 'components/Modal';

type Props = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleDeleteProduct: () => void;
  isDeleting: boolean;
};

export const DeleteProductModalLayout = ({
  isModalOpen,
  handleCloseModal,
  handleDeleteProduct,
  isDeleting,
}: Props) => (
  <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Deletar Item?">
    <Flex gap={2}>
      <Button flex="1" onClick={() => handleCloseModal()}>
        Cancelar
      </Button>
      <Button
        flex="1"
        colorScheme="red"
        onClick={() => handleDeleteProduct()}
        isLoading={isDeleting}
        loadingText="Removendo"
      >
        Remover
      </Button>
    </Flex>
  </Modal>
);
