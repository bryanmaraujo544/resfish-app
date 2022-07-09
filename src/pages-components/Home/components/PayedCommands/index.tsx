import { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { get10PastDays } from 'utils/get10PastDays';
import { Payment } from 'pages-components/Home/types/Payment';
import PaymentsService from 'pages-components/Home/services/PaymentsService';
import { SocketContext } from 'pages/_app';
import { PayedCommandsLayout } from './layout';
import { CloseCashier } from '../CloseCahier';

export const PayedCommands = () => {
  const [payedCommandsDate, setPayedCommandsDate] = useState(
    get10PastDays()[0].formatted
  );
  const [payments, setPayments] = useState<Payment[]>([]);

  const [isGettingPayments, setIsGettingPayments] = useState(true);
  const [isCloseCashierModalOpen, setIsCloseCashierModalOpen] = useState(false);

  const { socket } = useContext(SocketContext);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const allPayments = await PaymentsService.getAll({
        date: get10PastDays()[0].date,
      });
      setIsGettingPayments(false);
      setPayments(allPayments);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsGettingPayments(true);
      const currentDate = get10PastDays().find(
        ({ formatted }) => formatted === payedCommandsDate
      )?.date;

      const currentDateISO = currentDate?.toISO();

      const paymentsOfDate = await PaymentsService.getAll({
        date: currentDateISO,
      });
      setIsGettingPayments(false);
      setPayments(paymentsOfDate);
    })();
  }, [payedCommandsDate]);

  useEffect(() => {
    socket.on('payment-created', (paymentCreated: Payment) => {
      setPayments((prevPayments) => {
        const paymentAlreadyExists = prevPayments.some(
          (prevPayment) => prevPayment._id === paymentCreated._id
        );

        if (paymentAlreadyExists) {
          return prevPayments;
        }

        return [...prevPayments, paymentCreated];
      });
    });
  }, []);

  const handleGoToCommandPage = useCallback((commandId: string) => {
    router.push(`/command/${commandId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseCashier = useCallback(async () => {
    setIsCloseCashierModalOpen(true);
  }, []);

  const tempTotal = payments.reduce(
    (total, payment) =>
      Math.round((total + payment.totalPayed + Number.EPSILON) * 100) / 100,
    0
  );

  return (
    <>
      <PayedCommandsLayout
        payedCommandsDate={payedCommandsDate}
        setPayedCommandsDate={setPayedCommandsDate}
        payments={payments}
        handleGoToCommandPage={handleGoToCommandPage}
        handleCloseCashier={handleCloseCashier}
        isGettingPayments={isGettingPayments}
        total={tempTotal}
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
