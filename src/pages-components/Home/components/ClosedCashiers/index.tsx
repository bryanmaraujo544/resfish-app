import { useContext, useEffect, useState } from 'react';

import { Cashier } from 'types/Cashier';
import CashierService from 'pages-components/Home/services/CashierService';
import { useRouter } from 'next/router';
import { SocketContext } from 'pages/_app';
import { DateTime } from 'luxon';
import { downloadFile } from 'utils/downloadFile';
import { ClosedCashiersLayout } from './layout';

export const ClosedCashiers = () => {
  const [allCashiers, setAllCashiers] = useState<Cashier[]>([]);

  const { socket } = useContext(SocketContext);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const cashiers = await CashierService.getAll();
      setAllCashiers(cashiers);
    })();
  }, []);

  useEffect(() => {
    socket.on('cashier-created', (newCashier: Cashier) => {
      setAllCashiers((prevCashiers) => {
        const cashierAlreadyExists = prevCashiers.find((prevCashier) => {
          const prevDt = DateTime.fromISO(prevCashier.date, {
            zone: 'pt-BR',
            setZone: true,
          }).setLocale('pt-BR');
          const newCashierDt = DateTime.fromISO(newCashier.date, {
            zone: 'pt-BR',
            setZone: true,
          }).setLocale('pt-BR');

          if (
            prevDt.day === newCashierDt.day &&
            prevDt.month === newCashierDt.month &&
            prevDt.year === newCashierDt.year
          ) {
            return true;
          }
          return false;
        });

        if (cashierAlreadyExists) {
          const newCashiers = prevCashiers.filter(
            (prevCashier) => prevCashier._id !== cashierAlreadyExists._id
          );
          return [...newCashiers, newCashier];
        }

        return [...prevCashiers, newCashier];
      });
    });

    return () => {
      socket.off('cashier-created');
    };
  }, []);

  function handleGoToCashierPage(cashierId: string) {
    router.push(`/cashier/${cashierId}`);
  }

  function handleDownloadCashiers(e: any) {
    e.preventDefault();

    const dt = DateTime.local().setZone('UTC-3').setLocale('pt-BR');

    downloadFile({
      data: JSON.stringify(allCashiers),
      fileName: `caixas-${dt.day}-${dt.month}-${dt.year}.json`,
      fileType: 'text/json',
    });
  }

  return (
    <ClosedCashiersLayout
      allCashiers={allCashiers}
      handleGoToCashierPage={handleGoToCashierPage}
      handleDownloadCashiers={handleDownloadCashiers}
    />
  );
};
