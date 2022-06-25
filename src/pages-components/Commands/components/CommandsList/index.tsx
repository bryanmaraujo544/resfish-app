import { useCallback, useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { CommandsContext } from 'pages-components/Commands';
import { Command } from 'types/Command';
import { AddProductsModal } from '../AddProductsModal';
import { CommandsListLayout } from './layout';
import { EditCommandModal } from '../EditCommandModal';
import { DeleteCommandModal } from '../DeleteCommandModal';

export const CommandsList = () => {
  const [commandIdToAddProducts, setCommandIdToAddProducts] = useState('');
  const [isAddProductsModalOpen, setIsAddProductsOpen] = useState(false);

  const [commandToEdit, setCommandToEdit] = useState<Command>({} as Command);
  const [isEditCommandModalOpen, setIsEditCommandModalOpen] = useState(false);

  const [commandIdToDelete, setCommandIdToDelete] = useState('');
  const [isDeleteCommandModalOpen, setIsDeleteCommandModalOpen] =
    useState(false);

  const router = useRouter();
  const {
    searchContent,
    filter,
    orderBy,
    orderByDir,
    setOrderByDir,
    allCommands,
    commandStatusFilter,
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

  const handleOpenDeleteCommandModal = useCallback((commandId: string) => {
    setCommandIdToDelete(commandId);
    setIsDeleteCommandModalOpen(true);
  }, []);

  const filteredByFilter = useMemo(() => {
    if (!filter) {
      return allCommands.filter((command) => {
        if (commandStatusFilter === 'Ativas') {
          return command?.isActive;
        }

        return !command?.isActive;
      });
    }

    // MAKE THE ACTIVES AND PAYED COMMANDS

    const filtered = allCommands.filter((command) => {
      if (commandStatusFilter === 'Ativas') {
        return command?.fishingType === filter && command?.isActive;
      }

      return command?.fishingType === filter && !command?.isActive;
    });
    return filtered;
  }, [filter, allCommands, commandStatusFilter]);

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
      const commandStr = Object?.values(command)?.join('')?.toLowerCase();
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
        handleOpenDeleteCommandModal={handleOpenDeleteCommandModal}
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
      <DeleteCommandModal
        commandId={commandIdToDelete}
        isModalOpen={isDeleteCommandModalOpen}
        setIsModalOpen={setIsDeleteCommandModalOpen}
      />
    </>
  );
};
