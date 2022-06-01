import { useCallback, useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { CommandsContext } from 'pages-components/Commands';
import { AddProductsModal } from '../AddProductsModal';
import { CommandsListLayout } from './layout';
import { EditCommandModal } from '../EditCommandModal';
import { Command } from 'pages-components/Commands/types/Command';

export const CommandsList = () => {
  const [commandIdToAddProducts, setCommandIdToAddProducts] = useState('');
  const [isAddProductsModalOpen, setIsAddProductsOpen] = useState(false);

  const [commandToEdit, setCommandToEdit] = useState<Command>({} as Command);
  const [isEditCommandModalOpen, setIsEditCommandModalOpen] = useState(false);

  const router = useRouter();
  const {
    searchContent,
    filter,
    orderBy,
    orderByDir,
    setOrderByDir,
    allCommands,
  } = useContext(CommandsContext);

  const handleToggleOrderByDir = useCallback(() => {
    setOrderByDir((prev: string) => (prev === 'asc' ? 'desc' : 'asc'));
  }, [setOrderByDir]);

  const handleGoToCommandPage = useCallback(
    ({ commandId }: { commandId: string }) => {
      router.push(`/command/${commandId}`);
    },
    []
  );

  const handleOpenAddProductsModal = useCallback((commandId: string) => {
    setCommandIdToAddProducts(commandId);
    setIsAddProductsOpen(true);
  }, []);

  const handleOpenEditCommandModal = useCallback((command: Command) => {
    setCommandToEdit(command);
    setIsEditCommandModalOpen(true);
  }, []);

  const filteredByFilter = useMemo(() => {
    const filtered = allCommands.filter((command) => command.waiter === filter);
    return filtered.length > 0 ? filtered : allCommands;
  }, [filter, allCommands]);

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
    <>
      <CommandsListLayout
        items={filteredBySearch}
        orderBy={orderBy}
        orderByDir={orderByDir}
        handleToggleOrderByDir={handleToggleOrderByDir}
        handleGoToCommandPage={handleGoToCommandPage}
        handleOpenAddProductsModal={handleOpenAddProductsModal}
        handleOpenEditCommandModal={handleOpenEditCommandModal}
      />
      <AddProductsModal
        isModalOpen={isAddProductsModalOpen}
        setIsModalOpen={setIsAddProductsOpen}
        commandId={commandIdToAddProducts}
      />
      <EditCommandModal
        isModalOpen={isEditCommandModalOpen}
        setIsModalOpen={setIsEditCommandModalOpen}
        command={commandToEdit}
      />
    </>
  );
};
