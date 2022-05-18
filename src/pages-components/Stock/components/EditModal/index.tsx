import { SetStateAction, Dispatch } from 'react';
import { useToast } from '@chakra-ui/react';

import { formatPrice } from 'utils/formatPrice';
import { formatDecimalNum } from 'utils/formatDecimalNum';
import { EditModalLayout } from './layout';
import type { Item } from '../../types/Item';

interface Props {
  itemInfos: Item;
  isEditModalOpen: boolean;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const EditModal = ({
  itemInfos,
  isEditModalOpen,
  setIsEditModalOpen,
}: Props) => {
  const toast = useToast();

  function handleSubmit(e: any) {
    e.preventDefault();

    const unitPrice = itemInfos.unitPrice.split(' ')[1];
    const formattedUnitPrice = formatDecimalNum({
      num: unitPrice,
      to: 'point',
    }); // 33,90 -> 33.90
    console.log({ formattedUnitPrice });
    const isUnitPriceValid = Number(formattedUnitPrice) !== null; // 44.9 = true | 44,9 = false | 33,fd = false

    if (!isUnitPriceValid) {
      toast({
        status: 'error',
        title: 'Preço inválido :(',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    toast({
      status: 'success',
      title: 'Item atualizado',
    });
    onClose();
    // TODO: update the globalState
  }

  function onClose() {
    setIsEditModalOpen(false);
  }

  console.log(itemInfos.unitPrice);

  function handleChangeUnitPrice(e: any) {
    console.log(e.target.value);
    itemInfos.setUnitPrice(formatPrice(e.target.value));
  }

  return (
    <EditModalLayout
      title="Editar Item"
      isEditModalOpen={isEditModalOpen}
      onClose={onClose}
      itemInfos={itemInfos}
      handleSubmit={handleSubmit}
      handleChangeUnitPrice={handleChangeUnitPrice}
    />
  );
};
