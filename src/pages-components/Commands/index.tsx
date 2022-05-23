import { createContext, useMemo, useState } from 'react';

import { ContextProps } from './types/ContextProps';
import { AddCommandModal } from './components/AddCommandModal';
import { CommandsLayout } from './layout';

export const CommandsContext = createContext({} as ContextProps);

export const Commands = () => {
  const [filter, setFilter] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [orderByDir, setOrderByDir] = useState('asc' as 'asc' | 'desc');
  const [searchContent, setSearchContent] = useState('');

  console.log('commands rendered');

  const [isAddCommandModalOpen, setIsAddCommandModalOpen] = useState(false);

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
    }),
    [filter, orderBy, orderByDir, searchContent]
  );

  return (
    <CommandsContext.Provider value={contextValues}>
      <CommandsLayout handleOpenAddCommandModal={handleOpenAddCommandModal} />
      <AddCommandModal
        isModalOpen={isAddCommandModalOpen}
        setIsModalOpen={setIsAddCommandModalOpen}
      />
    </CommandsContext.Provider>
  );
};
