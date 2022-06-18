import { useState } from 'react';
import { DateTime } from 'luxon';
import { PayedCommandsLayout } from './layout';

export const PayedCommands = () => {
  console.log('payed commands');
  const [payedCommandsDate] = useState(new Date().toISOString());

  const dt = DateTime.fromISO(payedCommandsDate).setLocale('pt-BR');
  const createdAtFormatted = dt.toLocaleString(DateTime.DATE_FULL);

  return <PayedCommandsLayout payedCommandsDate={createdAtFormatted} />;
};
