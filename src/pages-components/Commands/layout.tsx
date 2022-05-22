import { Text, Icon } from '@chakra-ui/react';
import { MdPlaylistAdd } from 'react-icons/md';

import { Button } from 'components/Button';
import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import { NavHeader } from './components/NavHeader';

type Props = {
  handleOpenAddCommandModal: () => void;
};

export const CommandsLayout = ({ handleOpenAddCommandModal }: Props) => (
  <Layout>
    <Header>
      <Button isCallAction onClick={() => handleOpenAddCommandModal()}>
        <Icon as={MdPlaylistAdd} fontSize={[20, 24]} />
        Adicionar Comanda
      </Button>
    </Header>
    <NavHeader />
    <Text>Commands</Text>
  </Layout>
);
