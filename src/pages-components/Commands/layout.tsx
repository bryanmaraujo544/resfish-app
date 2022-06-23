import { Dispatch, SetStateAction } from 'react';
import { Heading, Icon, Spinner, Flex, Select } from '@chakra-ui/react';
import { MdPlaylistAdd } from 'react-icons/md';

import { Button } from 'components/Button';
import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import { NavHeader } from './components/NavHeader';
import { CommandsList } from './components/CommandsList';

type Props = {
  handleOpenAddCommandModal: () => void;
  isLoading: boolean;
  commandStatusFilter: 'Ativas' | 'Pagas';
  setCommandStatusFilter: Dispatch<SetStateAction<'Ativas' | 'Pagas'>>;
  handleDownload: (e: any) => void;
};

export const CommandsLayout = ({
  handleOpenAddCommandModal,
  isLoading,
  commandStatusFilter,
  setCommandStatusFilter,
  handleDownload,
}: Props) => (
  <Layout>
    <Header>
      <Button onClick={handleDownload}>Baixar Dados</Button>
      <Button isCallAction onClick={() => handleOpenAddCommandModal()}>
        <Icon as={MdPlaylistAdd} fontSize={[20, 24]} />
        Adicionar Comanda
      </Button>
    </Header>
    <Flex align="center" mb={6} justify="space-between" gap={2}>
      <Heading color="blue.800" fontSize={[16, 20, 24, 28]}>
        Comandas
      </Heading>
      <Select
        w="auto"
        value={commandStatusFilter}
        onChange={(e) =>
          setCommandStatusFilter(e.target.value as 'Ativas' | 'Pagas')
        }
        bg="blue.50"
        color="blue.900"
        fontWeight="600"
      >
        <option>Ativas</option>
        <option>Pagas</option>
      </Select>
    </Flex>
    <NavHeader />
    {isLoading ? (
      <Spinner
        size="xl"
        position="absolute"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
      />
    ) : (
      <CommandsList />
    )}
  </Layout>
);
