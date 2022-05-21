/* eslint-disable consistent-return */
import { useToast } from '@chakra-ui/react';
import { useCallback, Dispatch, SetStateAction, useState } from 'react';
import { formatDecimalNum } from 'utils/formatDecimalNum';
import { formatPrice } from 'utils/formatPrice';
import { AddItemModalLayout } from './layout';

type Props = {
  isAddItemModalOpen: boolean;
  setIsAddItemModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddItemModal = ({
  isAddItemModalOpen,
  setIsAddItemModalOpen,
}: Props) => {
  const toast = useToast();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  const [unitPrice, setUnitPrice] = useState('R$ ');

  const handleCloseModal = useCallback(() => {
    setIsAddItemModalOpen(false);
  }, []);

  function handleSubmit(e: any) {
    e.preventDefault();

    if (
      !name ||
      !category ||
      amount === null ||
      amount === undefined ||
      !unitPrice
    ) {
      return toast({
        status: 'error',
        title: 'Preencha os campos necessários',
        isClosable: true,
      });
    }

    const unitPriceNum = unitPrice.split(' ')[1];
    const formattedUnitPriceStr = formatDecimalNum({
      num: unitPriceNum,
      to: 'point',
    }); // 33,90 -> 33.90

    console.log({ formattedUnitPriceStr });

    const formattedUnitPrice = Number(formattedUnitPriceStr);
    console.log({ formattedUnitPrice });

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

    toast({
      status: 'success',
      title: 'Item atualizado',
      duration: 5000,
    });

    // TODO: update the globalState
    console.log({
      name,
      unitPrice: formattedUnitPrice,
      amount,
      category,
      image,
    });

    cleanFields();
    handleCloseModal();
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
      image={image}
      setImage={setImage}
      amount={amount}
      setAmount={setAmount}
    />
  );
};
