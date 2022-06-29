/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { SetStateAction, Dispatch } from 'react';
import { SetAmountModalLayout } from './layout';

type Props = {
  isSetAmountModalOpen: boolean;
  setIsSetAmountModalOpen: Dispatch<SetStateAction<boolean>>;

  amount: { current: string };
  handleAddProduct: (e: any) => void;
  isFishesCategory: boolean;
  isSelectingProduct: boolean;
};

export const SetAmountModal = ({
  isSetAmountModalOpen,
  setIsSetAmountModalOpen,
  amount,
  // setAmount,
  handleAddProduct,
  isFishesCategory,
  isSelectingProduct,
}: Props) => {
  function handleCloseAmountModal() {
    setIsSetAmountModalOpen(false);
    amount.current = '1';
  }

  return (
    <SetAmountModalLayout
      handleCloseAmountModal={handleCloseAmountModal}
      isModalOpen={isSetAmountModalOpen}
      amount={amount}
      handleAddProduct={handleAddProduct}
      isFishesCategory={isFishesCategory}
      isSelectingProduct={isSelectingProduct}
    />
  );
};
