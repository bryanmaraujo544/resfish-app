import { FormControl, Button, Input } from '@chakra-ui/react';

import { Modal } from 'components/Modal';
import type { Item } from '../../types/Item';

interface Props {
  isEditModalOpen: boolean;
  onClose: any;
  title: any;
  itemInfos: Item;
  handleSubmit: any;
}

export const EditModalLayout = ({
  isEditModalOpen,
  onClose,
  title,
  itemInfos,
  handleSubmit,
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
          type="number"
          value={itemInfos.unitPrice || ''}
          onChange={(e) => itemInfos.setUnitPrice(Number(e.target.value))}
        />
        <Input
          placeholder="Quantidade"
          type="number"
          value={itemInfos.amount || ''}
          onChange={(e) => itemInfos.setAmount(Number(e.target.value))}
        />
        <Button type="submit">Atualizar Item</Button>
      </FormControl>
    </Modal>
  );
};
