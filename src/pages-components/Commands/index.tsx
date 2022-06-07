import { createContext, useMemo, useState, useReducer, useEffect } from 'react';

import { ContextProps } from './types/ContextProps';
import { AddCommandModal } from './components/AddCommandModal';
import { CommandsLayout } from './layout';
import { commandsReducer } from './reducers/commandsReducer';
import CommandsService from './services/CommandsService';

export const CommandsContext = createContext({} as ContextProps);

export const Commands = () => {
  const [allCommands, allCommandsDispatch] = useReducer(commandsReducer, {
    value: [],
  });

  const [filter, setFilter] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [orderByDir, setOrderByDir] = useState('asc' as 'asc' | 'desc');
  const [searchContent, setSearchContent] = useState('');

  const [isAddCommandModalOpen, setIsAddCommandModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const commands = await CommandsService.getAllCommands();
      allCommandsDispatch({
        type: 'ADD-ALL-COMMANDS',
        payload: { commands },
      });
      setIsLoading(false);
    })();
  }, []);

  function handleOpenAddCommandModal() {
    setIsAddCommandModalOpen(true);
  }

  const contextValues = useMemo(
    () => ({
      filter,
      setFilter,
      orderBy,
      setOrderBy,
      orderByDir,
      setOrderByDir,
      searchContent,
      setSearchContent,
      allCommands: allCommands.value,
      allCommandsDispatch,
    }),
    [
      filter,
      orderBy,
      orderByDir,
      searchContent,
      allCommands,
      allCommandsDispatch,
    ]
  );

  return (
    <CommandsContext.Provider value={contextValues}>
      <CommandsLayout
        handleOpenAddCommandModal={handleOpenAddCommandModal}
        isLoading={isLoading}
      />
      <AddCommandModal
        isModalOpen={isAddCommandModalOpen}
        setIsModalOpen={setIsAddCommandModalOpen}
      />
    </CommandsContext.Provider>
  );
};
