/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
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
// import { Dispatch, SetStateAction, useRef } from 'react';
import { useRef } from 'react';

type Props = {
  isModalOpen: boolean;
  handleCloseAmountModal: () => void;
  amount: { current: string };
  handleAddProduct: (e: any) => void;
  isFishesCategory: boolean;
  isSelectingProduct: boolean;
};

export const SetAmountModalLayout = ({
  isModalOpen,
  handleCloseAmountModal,
  amount,
  handleAddProduct,
  isFishesCategory,
  isSelectingProduct,
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
            defaultValue="1"
            type="text"
            onChange={(e) => (amount.current = e.target.value)}
          />
        ) : (
          <NumberInput
            defaultValue="1"
            min={1}
            onChange={(numStr) => (amount.current = numStr)}
            color="blue.800"
            fontWeight={700}
          >
            <NumberInputField ref={inputRef} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        )}
        <Button
          w="100%"
          type="submit"
          isLoading={isSelectingProduct}
          loadingText="Selecionando"
        >
          Selecionar Produto
        </Button>
      </Stack>
    </Modal>
  );
};
