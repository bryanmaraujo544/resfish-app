import { CommandsContext } from 'pages-components/Commands';
import { useCallback, useContext, useMemo } from 'react';
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

export const CommandsList = () => {
  const { searchContent, filter, orderBy, orderByDir, setOrderByDir } =
    useContext(CommandsContext);

  const handleToggleOrderByDir = useCallback(() => {
    setOrderByDir((prev: string) => (prev === 'asc' ? 'desc' : 'asc'));
  }, [setOrderByDir]);

  const filteredByFilter = useMemo(() => {
    const filtered = mockCommands.filter(
      (command) => command.waiter === filter
    );
    return filtered.length > 0 ? filtered : mockCommands;
  }, [filter]);

  const filteredBySort = useMemo(() => {
    const filtered = filteredByFilter.sort((a: any, b: any) => {
      if (orderByDir === 'asc') {
        if (a[orderBy] < b[orderBy]) {
          return -1;
        }
        if (b[orderBy] < a[orderBy]) {
          return 1;
        }
        return 0;
      }

      if (a[orderBy] > b[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    });
    return filtered;
  }, [filteredByFilter, orderBy, orderByDir]);

  const filteredBySearch = useMemo(() => {
    const filtered = filteredBySort.filter((command) => {
      const commandStr = Object.values(command).join('').toLowerCase();
      if (commandStr.includes(searchContent.toLowerCase())) {
        return true;
      }
      return false;
    });
    return filtered;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchContent, filteredBySort, orderByDir]);

  return (
    <CommandsListLayout
      items={filteredBySearch}
      orderBy={orderBy}
      orderByDir={orderByDir}
      handleToggleOrderByDir={handleToggleOrderByDir}
    />
  );
};
