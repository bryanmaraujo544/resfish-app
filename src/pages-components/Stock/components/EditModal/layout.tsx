import {
  FormControl,
  Button,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Text,
} from '@chakra-ui/react';

import { Modal } from 'components/Modal';
import type { Item } from '../../types/Item';

interface Props {
  isEditModalOpen: boolean;
  onClose: any;
  title: any;
  itemInfos: Item;
  handleSubmit: any;
  handleChangeUnitPrice: any;
  isSubmitting: boolean;
}

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

export const EditModalLayout = ({
  isEditModalOpen,
  onClose,
  title,
  itemInfos,
  handleSubmit,
  handleChangeUnitPrice,
  isSubmitting,
}: Props) => (
  <Modal isOpen={isEditModalOpen} onClose={onClose} title={title}>
    <FormControl
      as="form"
      onSubmit={(e) => handleSubmit(e)}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <InputText title="Nome" />
      <Input
        placeholder="Nome"
        value={itemInfos.name}
        onChange={(e) => itemInfos.setName(e.target.value)}
        mb={2}
      />
      {/* <InputText title="URL da imagem" />
      <Input
        placeholder="URL da Imagem"
        value={itemInfos.image}
        onChange={(e) => itemInfos.setImage(e.target.value)}
        mb={2}
      /> */}
      <InputText title="Categoria" />
      <Select
        value={itemInfos.category || ''}
        onChange={(e) => itemInfos.setCategory(e.target.value)}
        mb={2}
      >
        {categories.map((categorie) => (
          <option key={`edit-categorie-${categorie}`}>{categorie}</option>
        ))}
      </Select>
      <InputText title="Preço da unidade" />
      <Input
        placeholder="Preço da Unidade"
        value={itemInfos.unitPrice || ''}
        onChange={(e) => handleChangeUnitPrice(e)}
        mb={2}
      />
      <InputText title="Quantidade" />
      <NumberInput
        value={itemInfos.amount || ''}
        onChange={(e) => itemInfos.setAmount(Number(e))}
        mb={2}
      >
        <NumberInputField placeholder="Quantidade" />

        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Button type="submit" isLoading={isSubmitting} loadingText="Atualizando">
        Atualizar Item
      </Button>
    </FormControl>
  </Modal>
);

const InputText = ({ title }: { title: string }) => <Text>{title}</Text>;
