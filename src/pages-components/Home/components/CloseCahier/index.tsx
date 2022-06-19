import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import CashierService from 'pages-components/Home/services/CashierService';
import { Payment } from 'pages-components/Home/types/Payment';
import { get10PastDays } from 'utils/get10PastDays';
import { useToast } from '@chakra-ui/react';
import { CloseCashierLayout } from './layout';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  payments: Payment[];
  payedCommandsDate: any;
}

export const CloseCashier = ({
  isModalOpen,
  setIsModalOpen,
  payments,
  payedCommandsDate,
}: Props) => {
  const [isSending, setIsSending] = useState(false);

  const toast = useToast();

  function handleCloseModal() {
    setIsModalOpen(false);
    setIsSending(false);
  }

  const handleCloseCashier = useCallback(async () => {
    try {
      if (isSending) {
        return;
      }
      setIsSending(true);

      const currentDate = get10PastDays().find(
        ({ formatted }) => formatted === payedCommandsDate
      )?.date;

      const currentDateISO = currentDate?.toISO();

      const { message } = await CashierService.closeCashier({
        date: currentDateISO,
        payments,
      });

      toast.closeAll();
      toast({
        status: 'success',
        title: message,
        duration: 2000,
      });
      handleCloseModal();
    } catch (error: any) {
      handleCloseModal();
      toast.closeAll();
      toast({
        status: 'error',
        title: error?.response?.data?.message,
        duration: 2000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payedCommandsDate, payments]);

  return (
    <CloseCashierLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      handleCloseCashier={handleCloseCashier}
      isSending={isSending}
    />
  );
};
