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
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { cashier: cashierFound } = await CashierService.getOne(cashierId);
      setCashier(cashierFound);
      setIsLoading(false);
    })();
  }, [cashierId]);

  function handleBackPage() {
    router.back();
  }

  const { payments } = cashier;

  const filteredBySearchPayments = payments?.filter((payment) => {
    const productsStr = payment.command.products
      .map((product) => Object.values(product).join(''))
      .join('');
    const commandStr = Object.values(payment.command)
      .join('')
      .replaceAll('[object Object]', '');

    const paymentStr = Object.values(payment)
      .join('')
      .replaceAll('[object Object]', '');

    const allStr = (productsStr + commandStr + paymentStr).toLowerCase();

    if (allStr?.includes(search.toLowerCase())) {
      return true;
    }
    return false;
  });

  return (
    <CashierLayout
      cashier={cashier}
      handleBackPage={handleBackPage}
      isLoading={isLoading}
      payments={filteredBySearchPayments}
      search={search}
      setSearch={setSearch}
    />
  );
};
