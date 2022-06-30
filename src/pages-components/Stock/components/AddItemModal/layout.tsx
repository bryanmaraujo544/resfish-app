/* eslint-disable react/destructuring-assignment */
import {
  FormControl,
  Input,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Text,
  Select,
} from '@chakra-ui/react';
import { Modal } from 'components/Modal';
import { Dispatch, SetStateAction } from 'react';

const categories = [
  'Pesca',
  'Peixes',
  'Pratos',
  'Bebidas',
  'Bebidas-Cozinha',
  'Doses',
  'Sobremesas',
  'Porções',
  'Misturas Congeladas',
];

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
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  isSubmitting: boolean;
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
  amount,
  setAmount,
  isSubmitting,
}: Props) => (
  <Modal
    isOpen={isModalOpen}
    title="Adicionar Item"
    onClose={handleCloseModal}
    size="2xl"
  >
    <FormControl
      as="form"
      onSubmit={(e) => handleSubmit(e)}
      display="flex"
      flexDirection="column"
      gap={4}
    >
      <InputGroup>
        <Text>Nome do produto *</Text>
        <Input
          placeholder="Coca-Cola"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </InputGroup>

      <InputGroup>
        <Text>Categoria *</Text>
        <Select
          placeholder="Selecione uma categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((categorie) => (
            <option key={`categorie-select-list-${categorie}`}>
              {categorie}
            </option>
          ))}
        </Select>
      </InputGroup>
      <InputGroup>
        <Text>Quantidade *</Text>
        <NumberInput
          defaultValue={1}
          precision={2}
          step={1}
          placeholder="Quantidade"
          value={amount}
          onChange={(value) => setAmount(Number(value))}
          min={1}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </InputGroup>
      <InputGroup>
        <Text>Preço da unidade *</Text>
        <Input
          placeholder="R$ Preço da Unidade *"
          value={unitPrice}
          onChange={(e) => handleChangeUnitPrice(e)}
        />
      </InputGroup>
      <Button
        type="submit"
        bg="blue.400"
        color="white"
        _hover={{ bg: 'blue.500' }}
        _active={{ bg: 'blue.300' }}
        isLoading={isSubmitting}
        loadingText="Adicionando"
      >
        Adicionar
      </Button>
    </FormControl>
  </Modal>
);

const InputGroup = (props: any) => (
  <Flex direction="column" gap={2} {...props}>
    {props.children}
  </Flex>
);
