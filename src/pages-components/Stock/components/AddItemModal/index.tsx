/* eslint-disable consistent-return */
import {
  useCallback,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from 'react';
import { useToast } from '@chakra-ui/react';

import { formatDecimalNum } from 'utils/formatDecimalNum';
import { formatPrice } from 'utils/formatPrice';
import { checkImageURL } from 'utils/checkImageURL';
import { StockContext } from 'pages-components/Stock';
import StockService from '../../services/index';
import { AddItemModalLayout } from './layout';

type Props = {
  isAddItemModalOpen: boolean;
  setIsAddItemModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddItemModal = ({
  isAddItemModalOpen,
  setIsAddItemModalOpen,
}: Props) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(1);
  const [unitPrice, setUnitPrice] = useState('R$ ');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { productsDispatch } = useContext(StockContext);
  const toast = useToast();

  const handleCloseModal = useCallback(() => {
    setIsAddItemModalOpen(false);
    setIsSubmitting(false);
  }, [setIsAddItemModalOpen]);

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      if (isSubmitting) {
        return;
      }
      setIsSubmitting(true);
      // taking out the "R$" of the string and getting only the number;
      const unitPriceNum = unitPrice.split(' ')[1];

      const formattedUnitPriceStr = formatDecimalNum({
        num: unitPriceNum,
        to: 'point',
      }); // 33,90 -> 33.90

      const formattedUnitPrice = Number(formattedUnitPriceStr);

      if (!name || !category || amount === null || amount === undefined) {
        toast({
          status: 'error',
          title: 'Preencha os campos necessários',
          isClosable: true,
        });
        setIsSubmitting(false);
        return;
      }

      const isUnitPriceValid = !!formattedUnitPrice || formattedUnitPrice === 0; // 44.9 = true | 44,9 = false | 33,fd = false
      if (!isUnitPriceValid) {
        toast({
          status: 'error',
          title: 'Preço inválido :(',
          duration: 5000,
          isClosable: true,
        });
        setIsSubmitting(false);
        return;
      }

      // check if image url is valid
      const isImageURLValid = checkImageURL(image);
      if (!isImageURLValid) {
        toast({
          status: 'error',
          title: 'A URL da imagem está inválida',
          isClosable: true,
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        status: 'loading',
        isClosable: true,
        title: 'Adicionando Item',
      });

      const data = await StockService.storeProduct({
        name,
        unitPrice: formattedUnitPrice,
        amount,
        category,
        imageURL: image,
      });

      toast.closeAll();

      productsDispatch({
        type: 'ADD-ONE-PRODUCT',
        payload: { product: data.product },
      });

      cleanFields();
      setIsSubmitting(false);
      handleCloseModal();
    } catch (error: any) {
      setIsSubmitting(false);
      toast.closeAll();
      toast({
        status: 'error',
        title: error?.response.data.message,
      });
    }
  }

  function handleChangeUnitPrice(e: any) {
    setUnitPrice(formatPrice(e.target.value));
  }

  function cleanFields() {
    setImage('');
    setName('');
    setAmount(0);
    setUnitPrice('R$ ');
    setCategory('');
  }

  return (
    <AddItemModalLayout
      handleSubmit={handleSubmit}
      isModalOpen={isAddItemModalOpen}
      handleCloseModal={handleCloseModal}
      unitPrice={unitPrice}
      handleChangeUnitPrice={handleChangeUnitPrice}
      name={name}
      setName={setName}
      category={category}
      setCategory={setCategory}
      amount={amount}
      setAmount={setAmount}
      isSubmitting={isSubmitting}
    />
  );
};
