import { DateTime } from 'luxon';

export const get10PastDays = () => {
  const todayDate = DateTime.local().setZone('UTC-3').setLocale('pt-BR');
  const dates = [
    {
      date: todayDate,
      formatted: todayDate.toLocaleString(DateTime.DATE_FULL),
    },
  ];

  for (let i = 1; i <= 10; i += 1) {
    const date = todayDate.minus({ days: i });
    dates.push({
      date,
      formatted: date.toLocaleString(DateTime.DATE_FULL),
    });
  }

  return dates;
};
