import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EditCommandModalLayout } from './layout';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  command: {
    _id?: string;
    table: string;
    waiter: string;
    fishingType: string;
  };
}

interface EditCommandInputs {
  table: string;
  waiter: string;
  fishingType: string;
}

export const EditCommandModal = ({
  isModalOpen,
  setIsModalOpen,
  command,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditCommandInputs>();

  useEffect(() => {
    // Setting the value of input of form with command's values
    setValue('table', command.table);
    setValue('waiter', command.waiter);
    setValue('fishingType', command.fishingType);
  }, [command]);

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  const handleEditCommand: SubmitHandler<EditCommandInputs> = (data) => {
    console.log('data', data);
    handleCloseModal();
  };

  return (
    <EditCommandModalLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      handleEditCommand={handleEditCommand}
      rhfRegister={register}
      rhfErrors={errors}
      rhfHandleSubmit={handleSubmit}
    />
  );
};
