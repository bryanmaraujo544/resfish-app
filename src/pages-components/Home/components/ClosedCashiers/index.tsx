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

  const [month, setMonth] = useState('Todos');
  const [year, setYear] = useState('Todos');

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

  const filteredCashiers = allCashiers.filter((cashier) => {
    // This path is when the user wants all the cashiers, it doesn't matter the year and month
    if (month === 'Todos' && year === 'Todos') {
      return true;
    }

    const dt = DateTime.fromISO(cashier.date, {
      zone: 'pt-BR',
      setZone: true,
    }).setLocale('pt-BR');
    const formattedDt = dt.toLocaleString(DateTime.DATE_FULL);

    // This path is when the user wants cashiers of all months of some specific year
    if (month === 'Todos' && formattedDt.includes(year.toLowerCase())) {
      return true;
    }

    // This path is when the user wants cashiers of some month of all years
    if (year === 'Todos' && formattedDt.includes(month.toLowerCase())) {
      return true;
    }

    // This path is when the user wants cashiers of some month and year
    if (
      formattedDt.includes(month.toLowerCase()) &&
      formattedDt.includes(year.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  return (
    <ClosedCashiersLayout
      allCashiers={filteredCashiers}
      handleGoToCashierPage={handleGoToCashierPage}
      handleDownloadCashiers={handleDownloadCashiers}
      year={year}
      setYear={setYear}
      month={month}
      setMonth={setMonth}
    />
  );
};
