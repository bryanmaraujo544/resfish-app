import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Input,
} from '@chakra-ui/react';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { Dispatch, SetStateAction, useRef } from 'react';

type Props = {
  isModalOpen: boolean;
  handleCloseAmountModal: () => void;
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  handleAddProduct: (e: any) => void;
  isFishesCategory: boolean;
};

export const SetAmountModalLayout = ({
  isModalOpen,
  handleCloseAmountModal,
  amount,
  setAmount,
  handleAddProduct,
  isFishesCategory,
}: Props) => {
  const inputRef = useRef(null);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseAmountModal}
      title="Quantidade do produto"
      initialFocusRef={inputRef}
    >
      <Stack spacing={4} as="form" onSubmit={(e) => handleAddProduct(e)}>
        {isFishesCategory ? (
          <Input
            value={amount}
            type="text"
            onChange={(e) => setAmount(e.target.value)}
          />
        ) : (
          <NumberInput
            value={amount}
            min={1}
            onChange={(numStr) => setAmount(numStr)}
            color="blue.800"
            fontWeight={700}
            // type="number"
          >
            <NumberInputField ref={inputRef} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        )}
        <Button w="100%" type="submit">
          Adicionar Produto
        </Button>
      </Stack>
    </Modal>
  );
};
