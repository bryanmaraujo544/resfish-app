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
}

export const EditModalLayout = ({
  isEditModalOpen,
  onClose,
  title,
  itemInfos,
  handleSubmit,
  handleChangeUnitPrice,
}: Props) => {
  console.log('modal');

  return (
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
          placeholder="Preço da Unidade"
          value={itemInfos.unitPrice || ''}
          onChange={(e) => handleChangeUnitPrice(e)}
        />
        <NumberInput>
          <NumberInputField
            placeholder="Quantidade"
            value={itemInfos.amount || ''}
            onChange={(e) => itemInfos.setAmount(Number(e.target.value))}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button type="submit">Atualizar Item</Button>
      </FormControl>
    </Modal>
  );
};
