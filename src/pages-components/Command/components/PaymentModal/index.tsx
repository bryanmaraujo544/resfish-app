import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { PaymentModalLayout } from './layout';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

interface PaymentInputs {
  receivedValue: string;
  paymentType: string;
}

export const PaymentModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentInputs>();

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  const handleMakePayment: SubmitHandler<PaymentInputs> = async ({
    receivedValue,
    paymentType,
  }) => {
    console.log({ receivedValue, paymentType });
  };

  return (
    <PaymentModalLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      handleMakePayment={handleMakePayment}
      rhfRegister={register}
      rhfHandleSubmit={handleSubmit}
      rhfErrors={errors}
    />
  );
};
