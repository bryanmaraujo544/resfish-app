import { Heading, Icon, Spinner } from '@chakra-ui/react';
import { MdPlaylistAdd } from 'react-icons/md';

import { Button } from 'components/Button';
import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import { NavHeader } from './components/NavHeader';
import { CommandsList } from './components/CommandsList';

type Props = {
  handleOpenAddCommandModal: () => void;
  isLoading: boolean;
};

export const CommandsLayout = ({
  handleOpenAddCommandModal,
  isLoading,
}: Props) => (
  <Layout>
    <Header>
      <Button isCallAction onClick={() => handleOpenAddCommandModal()}>
        <Icon as={MdPlaylistAdd} fontSize={[20, 24]} />
        Adicionar Comanda
      </Button>
    </Header>
    <Heading mb={8} color="blue.800" fontSize={[16, 20, 24, 32]}>
      Comandas
    </Heading>
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
