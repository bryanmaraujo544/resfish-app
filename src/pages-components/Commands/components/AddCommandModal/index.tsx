import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import CommandsService from 'pages-components/Commands/services/CommandsService';
import { useToast } from '@chakra-ui/react';
import { CommandsContext } from 'pages-components/Commands';
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
  const [isAdding, setIsAdding] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddCommandInputs>();

  const { allCommandsDispatch } = useContext(CommandsContext);
  const toast = useToast();

  function handleCloseModal() {
    setIsModalOpen(false);
    setIsAdding(false);
  }

  const handleAddCommand: SubmitHandler<AddCommandInputs> = async ({
    table,
    waiter,
    fishingType,
  }) => {
    try {
      if (isAdding) {
        return;
      }
      setIsAdding(true);
      const { message, command } = await CommandsService.storeCommand({
        table,
        waiter,
        fishingType,
      });

      allCommandsDispatch({ type: 'ADD-ONE-COMMAND', payload: { command } });
      setValue('table', '');
      setValue('waiter', '');

      toast.closeAll();
      toast({
        status: 'success',
        title: message,
        duration: 2000,
        isClosable: true,
      });

      handleCloseModal();
    } catch (error: any) {
      setIsAdding(false);
      toast.closeAll();
      toast({
        status: 'error',
        title: error?.response?.data?.message,
        duration: 3000,
        isClosable: true,
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
      isAdding={isAdding}
    />
  );
};
