import {
  FormControl,
  Button,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
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
      <Input
        placeholder="URL da Imagem"
        value={itemInfos.image}
        onChange={(e) => itemInfos.setImage(e.target.value)}
      />
      <Input
        placeholder="Nome"
        value={itemInfos.name}
        onChange={(e) => itemInfos.setName(e.target.value)}
      />
      <Input
        placeholder="Categoria"
        value={itemInfos.category || ''}
        onChange={(e) => itemInfos.setCategory(e.target.value)}
      />
      <Input
        placeholder="Preço da Unidade"
        value={itemInfos.unitPrice || ''}
        onChange={(e) => handleChangeUnitPrice(e)}
      />
      <NumberInput
        value={itemInfos.amount || ''}
        onChange={(e) => itemInfos.setAmount(Number(e))}
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
