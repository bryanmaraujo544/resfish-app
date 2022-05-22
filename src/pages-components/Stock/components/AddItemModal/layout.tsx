import {
  FormControl,
  Input,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { Modal } from 'components/Modal';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  handleSubmit: any;
  isModalOpen: boolean;
  handleCloseModal: any;
  unitPrice: any;
  handleChangeUnitPrice: any;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
};

export const AddItemModalLayout = ({
  isModalOpen,
  handleSubmit,
  handleCloseModal,
  handleChangeUnitPrice,
  unitPrice,
  name,
  setName,
  category,
  setCategory,
  image,
  setImage,
  amount,
  setAmount,
}: Props) => (
  <Modal isOpen={isModalOpen} title="Adicionar Item" onClose={handleCloseModal}>
    <FormControl
      as="form"
      onSubmit={(e) => handleSubmit(e)}
      display="flex"
      flexDirection="column"
      gap={4}
    >
      <Input
        placeholder="Nome do produto *"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="URL da imagem"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Input
        placeholder="Categoria *"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <NumberInput
        defaultValue={15}
        precision={2}
        step={5}
        placeholder="Quantidade"
        value={amount}
        onChange={(value) => setAmount(Number(value))}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Input
        placeholder="R$ Preço da Unidade *"
        value={unitPrice}
        onChange={(e) => handleChangeUnitPrice(e)}
      />
      <Button
        type="submit"
        bg="blue.400"
        color="white"
        _hover={{ bg: 'blue.500' }}
        _active={{ bg: 'blue.300' }}
      >
        Adicionar
      </Button>
    </FormControl>
  </Modal>
);
