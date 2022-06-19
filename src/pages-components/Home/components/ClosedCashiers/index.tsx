import { useEffect, useState } from 'react';

import { Cashier } from 'types/Cashier';
import CashierService from 'pages-components/Home/services/CashierService';
import { useRouter } from 'next/router';
import { ClosedCashiersLayout } from './layout';

export const ClosedCashiers = () => {
  const [allCashiers, setAllCashiers] = useState<Cashier[]>([]);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const cashiers = await CashierService.getAll();
      setAllCashiers(cashiers);
    })();
  }, []);

  function handleGoToCashierPage(cashierId: string) {
    router.push(`/cashier/${cashierId}`);
  }

  return (
    <ClosedCashiersLayout
      allCashiers={allCashiers}
      handleGoToCashierPage={handleGoToCashierPage}
    />
  );
};
