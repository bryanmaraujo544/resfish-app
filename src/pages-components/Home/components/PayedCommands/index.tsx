import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { get10PastDays } from 'utils/get10PastDays';
import { Payment } from 'pages-components/Home/types/Payment';
import PaymentsService from 'pages-components/Home/services/PaymentsService';
import { PayedCommandsLayout } from './layout';
import { CloseCashier } from '../CloseCahier';

export const PayedCommands = () => {
  const [payedCommandsDate, setPayedCommandsDate] = useState(
    get10PastDays()[0].formatted
  );
  const [payments, setPayments] = useState<Payment[]>([]);

  const [isCloseCashierModalOpen, setIsCloseCashierModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const allPayments = await PaymentsService.getAll({
        date: get10PastDays()[0].date,
      });
      setPayments(allPayments);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const currentDate = get10PastDays().find(
        ({ formatted }) => formatted === payedCommandsDate
      )?.date;

      const currentDateISO = currentDate?.toISO();

      const paymentsOfDate = await PaymentsService.getAll({
        date: currentDateISO,
      });

      setPayments(paymentsOfDate);
    })();
  }, [payedCommandsDate]);

  const handleGoToCommandPage = useCallback((commandId: string) => {
    router.push(`/command/${commandId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseCashier = useCallback(async () => {
    setIsCloseCashierModalOpen(true);
  }, []);

  return (
    <>
      <PayedCommandsLayout
        payedCommandsDate={payedCommandsDate}
        setPayedCommandsDate={setPayedCommandsDate}
        payments={payments}
        handleGoToCommandPage={handleGoToCommandPage}
        handleCloseCashier={handleCloseCashier}
      />
      <CloseCashier
        isModalOpen={isCloseCashierModalOpen}
        setIsModalOpen={setIsCloseCashierModalOpen}
        payments={payments}
        payedCommandsDate={payedCommandsDate}
      />
    </>
  );
};
