import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import CashierService from 'pages-components/Home/services/CashierService';
import { Payment } from 'pages-components/Home/types/Payment';
import { get10PastDays } from 'utils/get10PastDays';
import { useToast } from '@chakra-ui/react';
import CommandService from 'pages-components/Home/services/CommandService';
import { DateTime } from 'luxon';
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

      // Verify if there are open commands
      const activeCommands = await CommandService.getTodayCommands({
        isActive: 'true',
      });

      const todayDate = DateTime.local().setZone('UTC-3').setLocale('pt-BR');
      const todayDateFormatted = todayDate.toLocaleString(DateTime.DATE_FULL);

      if (
        activeCommands?.length > 0 &&
        todayDateFormatted === payedCommandsDate
      ) {
        toast.closeAll();
        handleCloseModal();
        toast({
          status: 'warning',
          title: 'Há comandas ativas. Exclua ou pague-as para fechar o caixa. ',
          isClosable: true,
          duration: 5000,
        });
        return;
      }

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
