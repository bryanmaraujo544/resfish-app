import { useEffect, useState } from 'react';
import { CommandLayout } from './layout';

const mockCommands = [
  {
    id: 2,
    table: 'João Gomes',
    waiter: 'Diego',
    total: 458.9,
    products: [
      {
        name: 'Coca-Cola',
        amount: 5,
        unitPrice: 7.9,
      },
      {
        name: 'Porção Batata Frita',
        amount: 2,
        unitPrice: 32.5,
      },
      {
        name: 'Peixe Baiacu',
        amount: 3,
        unitPrice: 24.5,
      },
    ],
  },
  {
    id: 3,
    table: 'João Gomes',
    waiter: 'Diego',
    total: 458.9,
  },
  {
    id: 4,
    table: 'Mbappé',
    waiter: 'Diego',
    total: 4580.9,
  },
  {
    id: 5,
    table: 'Neymar',
    waiter: 'Júlio',
    total: 1259.9,
  },
  {
    id: 6,
    table: 'Amanda vermelho',
    waiter: 'Bryan',
    total: 458.9,
  },
  {
    id: 7,
    table: 'João Gomes',
    waiter: 'Diego',
    total: 358.9,
  },
];

type Props = {
  commandId: string | string[] | undefined;
};

export const Command = ({ commandId }: Props) => {
  const [command, setCommand] = useState({});

  useEffect(() => {
    const [commandFound] = mockCommands.filter(
      ({ id }) => id.toString() === commandId
    );
    setCommand(commandFound);
  }, [commandId]);

  return <CommandLayout command={command} />;
};
