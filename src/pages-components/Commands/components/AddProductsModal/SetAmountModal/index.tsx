/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { SetStateAction, Dispatch } from 'react';
import { SetAmountModalLayout } from './layout';

type Props = {
  isSetAmountModalOpen: boolean;
  setIsSetAmountModalOpen: Dispatch<SetStateAction<boolean>>;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  handleAddProduct: () => void;
};

export const SetAmountModal = ({
  isSetAmountModalOpen,
  setIsSetAmountModalOpen,
  amount,
  setAmount,
  handleAddProduct,
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
    />
  );
};
