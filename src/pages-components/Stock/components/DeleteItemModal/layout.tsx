import { Button, Flex } from '@chakra-ui/react';
import { Modal } from 'components/Modal';

type Props = {
  isModalOpen: boolean;
  handleCloseModal: any;
  handleDeleteItem: any;
  isDeleting: boolean;
};

export const DeleteItemModalLayout = ({
  isModalOpen,
  handleCloseModal,
  handleDeleteItem,
  isDeleting,
}: Props) => (
  <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Deletar item?">
    <Flex gap={2}>
      <Button onClick={() => handleCloseModal()} color="blue.900" flex="1">
        Cancelar
      </Button>
      <Button
        onClick={() => handleDeleteItem()}
        isLoading={isDeleting}
        loadingText="Deletando"
        border="2px"
        borderColor="red.400"
        color="red.400"
        bg="none"
        flex="1"
        _hover={{
          bg: 'red.50',
        }}
        _active={{
          bg: 'red.100',
          color: 'red.700',
        }}
      >
        Deletar
      </Button>
    </Flex>
  </Modal>
);
