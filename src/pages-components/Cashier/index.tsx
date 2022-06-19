import { Cashier as CashierProps } from 'types/Cashier';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CashierLayout } from './layout';
import CashierService from './services/CashierService';

interface Props {
  cashierId: string;
}

export const Cashier = ({ cashierId }: Props) => {
  const [cashier, setCashier] = useState<CashierProps>({} as CashierProps);
  // console.log({ cashier });

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { cashier: cashierFound } = await CashierService.getOne(cashierId);
      setCashier(cashierFound);
    })();
  }, [cashierId]);

  function handleBackPage() {
    router.back();
  }

  return <CashierLayout cashier={cashier} handleBackPage={handleBackPage} />;
};
