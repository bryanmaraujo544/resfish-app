/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { SetStateAction, Dispatch } from 'react';
import { SetAmountModalLayout } from './layout';

type Props = {
  isSetAmountModalOpen: boolean;
  setIsSetAmountModalOpen: Dispatch<SetStateAction<boolean>>;
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  handleAddProduct: (e: any) => void;
  isFishesCategory: boolean;
};

export const SetAmountModal = ({
  isSetAmountModalOpen,
  setIsSetAmountModalOpen,
  amount,
  setAmount,
  handleAddProduct,
  isFishesCategory,
}: Props) => {
  function handleCloseAmountModal() {
    setIsSetAmountModalOpen(false);
  }

  return (
    <SetAmountModalLayout
      handleCloseAmountModal={handleCloseAmountModal}
      isModalOpen={isSetAmountModalOpen}
      amount={amount}
      setAmount={setAmount}
      handleAddProduct={handleAddProduct}
      isFishesCategory={isFishesCategory}
    />
  );
};
