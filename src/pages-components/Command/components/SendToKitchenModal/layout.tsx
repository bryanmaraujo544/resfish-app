import { Button, Flex, Stack, Textarea, Text } from '@chakra-ui/react';
import { Modal } from 'components/Modal';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSendToKitchen: () => void;
  isSending: boolean;
  observation: string;
  setObservation: Dispatch<SetStateAction<string>>;
}

export const SendToKitchenModalLayout = ({
  isModalOpen,
  handleCloseModal,
  handleSendToKitchen,
  isSending,
  observation,
  setObservation,
}: Props) => (
  <Modal
    isOpen={isModalOpen}
    onClose={() => handleCloseModal()}
    title="Mandar para Cozinha?"
  >
    <Stack>
      <Text>Observações:</Text>
      <Textarea
        placeholder="Ex: Coca Cola com gelo e limão"
        value={observation}
        onChange={(e) => setObservation(e.target.value)}
      />
      <Flex gap={2} mt={2}>
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
    </Stack>
  </Modal>
);
