import { Dispatch, SetStateAction, useCallback, useContext } from 'react';
import { useToast } from '@chakra-ui/react';

import CommandsService from 'pages-components/Commands/services/CommandsService';
import { DeleteCommandModalLayout } from './layout';
import { CommandsContext } from 'pages-components/Commands';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  commandId: string;
}

export const DeleteCommandModal = ({
  isModalOpen,
  setIsModalOpen,
  commandId,
}: Props) => {
  const { allCommandsDispatch } = useContext(CommandsContext);
  const toast = useToast();

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  const handleDeleteCommand = useCallback(async () => {
    if (!commandId) {
      throw new Error('Any commandId was informed');
    }

    try {
      const { message } = await CommandsService.deleteCommand(commandId);

      allCommandsDispatch({
        type: 'REMOVE-ONE-COMMAND',
        payload: { commandId },
      });

      toast({
        status: 'success',
        title: message,
        duration: 2000,
        isClosable: true,
      });
      handleCloseModal();
    } catch (error: any) {
      toast({
        status: 'error',
        title: error?.response?.data?.message,
      });
    }
  }, [commandId]);

  return (
    <DeleteCommandModalLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      handleDeleteCommand={handleDeleteCommand}
    />
  );
};
