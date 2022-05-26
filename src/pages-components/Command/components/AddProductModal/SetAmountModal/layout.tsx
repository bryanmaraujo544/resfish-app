import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from '@chakra-ui/react';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { Dispatch, SetStateAction, useRef } from 'react';

type Props = {
  isModalOpen: boolean;
  handleCloseAmountModal: () => void;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  handleAddProduct: () => void;
};

export const SetAmountModalLayout = ({
  isModalOpen,
  handleCloseAmountModal,
  amount,
  setAmount,
  handleAddProduct,
}: Props) => {
  const inputRef = useRef(null);
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseAmountModal}
      title="Quantidade do produto"
      initialFocusRef={inputRef}
    >
      <Stack spacing={4}>
        <NumberInput
          value={amount}
          min={0}
          onChange={(numStr) => setAmount(Number(numStr))}
        >
          <NumberInputField ref={inputRef} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button w="100%" onClick={() => handleAddProduct()}>
          Adicionar Produto
        </Button>
      </Stack>
    </Modal>
  );
};
