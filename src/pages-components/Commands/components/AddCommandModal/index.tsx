import { Dispatch, SetStateAction } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AddCommandModalLayout } from './layout';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

type AddCommandInputs = {
  table: string;
  waiter: string;
  fishingType: string;
};

export const AddCommandModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCommandInputs>();

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  const handleAddCommand: SubmitHandler<AddCommandInputs> = (data) => {
    console.log(data);
    handleCloseModal();
  };

  console.log('add comman');
  return (
    <AddCommandModalLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      rhfHandleSubmit={handleSubmit}
      handleAddCommand={handleAddCommand}
      rhfRegister={register}
      rhfErrors={errors}
    />
  );
};
