import { CommandsListLayout } from './layout';

const mockCommands = [
  {
    id: 2,
    table: 'João Gomes',
    waiter: 'Diego',
    total: 458.9,
  },
  {
    id: 3,
    table: 'João Gomes',
    waiter: 'Diego',
    total: 458.9,
  },
  {
    id: 4,
    table: 'João Gomes',
    waiter: 'Diego',
    total: 458.9,
  },
  {
    id: 5,
    table: 'João Gomes',
    waiter: 'Diego',
    total: 458.9,
  },
  {
    id: 6,
    table: 'João Gomes',
    waiter: 'Diego',
    total: 458.9,
  },
  {
    id: 7,
    table: 'João Gomes',
    waiter: 'Diego',
    total: 458.9,
  },
];

export const CommandsList = () => {
  console.log('commands list');

  return <CommandsListLayout items={mockCommands} />;
};
