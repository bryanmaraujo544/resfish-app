import { useToast } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';

import { SendToKitchenModalLayout } from './layout';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const SendToKitchenModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  const [isSending, setIsSending] = useState(false);
  const toast = useToast();

  function handleCloseModal() {
    setIsModalOpen(false);
    setIsSending(false);
  }

  function handleSendToKitchen() {
    try {
      if (isSending) {
        return;
      }
      setIsSending(true);
    } catch (error: any) {
      toast.closeAll();
      toast({
        status: 'error',
        title: error?.response?.data?.message || 'Erro em mandar para cozinha',
        duration: 2000,
        isClosable: true,
      });
    }
  }

  return (
    <SendToKitchenModalLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      handleSendToKitchen={handleSendToKitchen}
      isSending={isSending}
    />
  );
};
