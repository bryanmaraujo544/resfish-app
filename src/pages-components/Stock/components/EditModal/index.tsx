import { SetStateAction, Dispatch, useContext } from 'react';
import { useToast } from '@chakra-ui/react';

import StockService from '../../services/index';
import { formatPrice } from 'utils/formatPrice';
import { formatDecimalNum } from 'utils/formatDecimalNum';
import { EditModalLayout } from './layout';
import type { Item } from '../../types/Item';
import { StockContext } from 'pages-components/Stock';

interface Props {
  itemInfos: Item;
  isEditModalOpen: boolean;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const EditModal = ({
  isEditModalOpen,
  setIsEditModalOpen,
  itemInfos,
}: Props) => {
  const { productsDispatch } = useContext(StockContext);
  const toast = useToast();

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      const {
        name,
        amount,
        unitPrice: updatedUnitPrice,
        category,
        image,
        id,
      }: any = itemInfos;

      const unitPrice = updatedUnitPrice.split(' ')[1];
      const formattedUnitPrice = Number(
        formatDecimalNum({
          num: unitPrice,
          to: 'point',
        })
      ); // 33,90 -> 33.90
      const isUnitPriceValid = !!formattedUnitPrice || formattedUnitPrice === 0; // 44.9 = true | 44,9 = false | 33,fd = false

      if (!isUnitPriceValid) {
        toast({
          status: 'error',
          title: 'Preço inválido :(',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      if (!name || !amount || !category) {
        toast({
          status: 'error',
          title: 'Preencha os campos obrigatórios',
          isClosable: true,
        });
        return;
      }

      const { product: newProduct, message } = await StockService.updateProduct(
        {
          _id: id,
          name,
          amount,
          category,
          imageURL: image,
          unitPrice: formattedUnitPrice,
        }
      );

      productsDispatch({
        type: 'UPDATE-ONE-PRODUCT',
        payload: { product: newProduct },
      });

      toast({
        status: 'success',
        title: message,
      });

      onClose();
    } catch (err: any) {
      toast({
        status: 'error',
        title: err?.response.data.message,
      });
    }
  }

  function onClose() {
    setIsEditModalOpen(false);
  }

  function handleChangeUnitPrice(e: any) {
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
