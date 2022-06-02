import { Dispatch, SetStateAction, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import CommandsService from 'pages-components/Commands/services/CommandsService';
import { AddCommandModalLayout } from './layout';
import { useToast } from '@chakra-ui/react';
import { CommandsContext } from 'pages-components/Commands';

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

  const { allCommandsDispatch } = useContext(CommandsContext);
  const toast = useToast();

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  const handleAddCommand: SubmitHandler<AddCommandInputs> = async ({
    table,
    waiter,
    fishingType,
  }) => {
    try {
      const { message, command } = await CommandsService.storeCommand({
        table,
        waiter,
        fishingType,
      });

      allCommandsDispatch({ type: 'ADD-ONE-COMMAND', payload: { command } });

      toast({
        status: 'success',
        title: message,
      });

      handleCloseModal();
    } catch (error: any) {
      toast({
        status: 'error',
        title: error?.response?.data?.message,
        duration: 3000,
      });
    }
  };

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
