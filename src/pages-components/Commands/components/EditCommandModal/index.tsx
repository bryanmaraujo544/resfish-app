import { useToast } from '@chakra-ui/react';
import { CommandsContext } from 'pages-components/Commands';
import CommandsService from 'pages-components/Commands/services/CommandsService';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EditCommandModalLayout } from './layout';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  command: {
    _id?: string;
    table?: string;
    waiter?: string;
    fishingType?: string;
  };
}

interface EditCommandInputs {
  table: string;
  waiter: string;
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

  const [isUpdating, setIsUpdating] = useState(false);

  const { allCommandsDispatch } = useContext(CommandsContext);
  const toast = useToast();

  useEffect(() => {
    // Setting the value of input of form with command's values
    setValue('table', command?.table || '');
    setValue('waiter', command?.waiter || '');
  }, [command, setValue]);

  function handleCloseModal() {
    setIsModalOpen(false);
    setIsUpdating(false);
  }

  const handleEditCommand: SubmitHandler<EditCommandInputs> = async ({
    table,
    waiter,
  }) => {
    if (table === command?.table && waiter === command?.waiter) {
      handleCloseModal();
      toast({
        status: 'info',
        title: 'Nada alterado',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      if (isUpdating) {
        return;
      }

      setIsUpdating(true);

      const { message, command: newCommand } =
        await CommandsService.updateCommand({
          _id: command._id,
          table,
          waiter,
        });

      allCommandsDispatch({
        type: 'UPDATE-ONE-COMMAND',
        payload: { command: newCommand },
      });

      toast.closeAll();
      toast({
        status: 'success',
        title: message || '',
        isClosable: true,
        duration: 2000,
      });

      handleCloseModal();
    } catch (error: any) {
      setIsUpdating(false);
      toast({
        status: 'error',
        title: error?.response?.data?.message,
        duration: 2000,
      });
    }
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
