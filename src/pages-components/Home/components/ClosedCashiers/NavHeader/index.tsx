import { Dispatch, SetStateAction } from 'react';
import { Cashier } from 'types/Cashier';
import { NavHeaderLayout } from './layout';

interface Props {
  handleDownloadCashiers: (e: any) => void;
  year: string;
  setYear: Dispatch<SetStateAction<string>>;
  month: string;
  setMonth: Dispatch<SetStateAction<string>>;
  allCashiers: Cashier[];
}

export const NavHeader = ({
  handleDownloadCashiers,
  month,
  setMonth,
  setYear,
  year,
  allCashiers,
}: Props) => {
  const totalValue = allCashiers?.reduce(
    (total, current) => (current.total * 100 + total * 100) / 100,
    0
  );

  const totalCommands = allCashiers?.reduce(
    (total, current) => (current?.payments?.length || 0) + total,
    0
  );

  return (
    <NavHeaderLayout
      handleDownloadCashiers={handleDownloadCashiers}
      month={month}
      setMonth={setMonth}
      setYear={setYear}
      year={year}
      totalValue={totalValue}
      totalCommands={totalCommands}
    />
  );
};
