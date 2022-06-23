import {
  createContext,
  useMemo,
  useState,
  useReducer,
  useEffect,
  useContext,
} from 'react';

import { Product } from 'types/Product';
import { SocketContext } from 'pages/_app';
import { Command } from 'types/Command';
import { downloadFile } from 'utils/downloadFile';
import { DateTime } from 'luxon';
import { ContextProps } from './types/ContextProps';
import { AddCommandModal } from './components/AddCommandModal';
import { CommandsLayout } from './layout';
import { commandsReducer } from './reducers/commandsReducer';
import CommandsService from './services/CommandsService';
import { stockProductsReducer } from './reducers/stockProductsReducer';

export const CommandsContext = createContext({} as ContextProps);

export const Commands = () => {
  const [allCommands, allCommandsDispatch] = useReducer(commandsReducer, {
    value: [],
  });
  const [stockProducts, stockProductsDispatch] = useReducer(
    stockProductsReducer,
    { value: [] as Product[] }
  );

  const [filter, setFilter] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [orderByDir, setOrderByDir] = useState('asc' as 'asc' | 'desc');
  const [searchContent, setSearchContent] = useState('');
  const [commandStatusFilter, setCommandStatusFilter] = useState<
    'Ativas' | 'Pagas'
  >('Ativas');

  const [isAddCommandModalOpen, setIsAddCommandModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { socket } = useContext(SocketContext);

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

  useEffect(() => {
    socket.on('command-created', (newCommand: Command) => {
      allCommandsDispatch({
        type: 'ADD-ONE-COMMAND',
        payload: { command: newCommand },
      });
    });

    socket.on('command-updated', (commandUpdated: Command) => {
      allCommandsDispatch({
        type: 'UPDATE-ONE-COMMAND',
        payload: { command: commandUpdated },
      });
    });

    socket.on('command-deleted', (commandId: string) => {
      allCommandsDispatch({
        type: 'REMOVE-ONE-COMMAND',
        payload: { commandId },
      });
    });

    socket.on('product-updated', (updatedProduct: Product) => {
      stockProductsDispatch({
        type: 'UPDATE-ONE-PRODUCT',
        payload: { product: updatedProduct },
      });
    });

    return () => {
      socket.off('command-created');
      socket.off('command-updated');
      socket.off('command-deleted');
      socket.off('product-updated');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleOpenAddCommandModal() {
    setIsAddCommandModalOpen(true);
  }

  function handleDownload(e: any) {
    e.preventDefault();

    const dt = DateTime.local().setZone('UTC-3').setLocale('pt-BR');

    downloadFile({
      data: JSON.stringify(allCommands.value),
      fileName: `comandas-${dt.day}-${dt.month}-${dt.year}.json`,
      fileType: 'text/json',
    });
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
      commandStatusFilter,
      setCommandStatusFilter,
      allCommands: allCommands.value,
      allCommandsDispatch,
      stockProducts: stockProducts.value,
      stockProductsDispatch,
    }),
    [
      filter,
      orderBy,
      orderByDir,
      searchContent,
      allCommands,
      allCommandsDispatch,
      commandStatusFilter,
      setCommandStatusFilter,
      stockProducts,
      stockProductsDispatch,
    ]
  );

  return (
    <CommandsContext.Provider value={contextValues}>
      <CommandsLayout
        handleOpenAddCommandModal={handleOpenAddCommandModal}
        isLoading={isLoading}
        commandStatusFilter={commandStatusFilter}
        setCommandStatusFilter={setCommandStatusFilter}
        handleDownload={handleDownload}
      />
      <AddCommandModal
        isModalOpen={isAddCommandModalOpen}
        setIsModalOpen={setIsAddCommandModalOpen}
      />
    </CommandsContext.Provider>
  );
};
