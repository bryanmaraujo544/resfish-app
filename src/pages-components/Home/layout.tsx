import {
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  Button,
} from '@chakra-ui/react';
import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import { Dispatch, SetStateAction } from 'react';
import { ClosedCashiers } from './components/ClosedCashiers';
import { PayedCommands } from './components/PayedCommands';

interface Props {
  handleAsksPermition: () => void;
  isPermittedToSeeClosedCahiers: boolean;
  setIsAsksPermitionModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const HomeLayout = ({
  handleAsksPermition,
  isPermittedToSeeClosedCahiers,
  setIsAsksPermitionModalOpen,
}: Props) => (
  <Layout>
    <Header />
    <Tabs>
      <TabList mb={[2, 4]}>
        <Tab>Comandas Pagas</Tab>
        <Tab onClick={handleAsksPermition}>Caixas Fechados</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <PayedCommands />
        </TabPanel>
        <TabPanel>
          {isPermittedToSeeClosedCahiers ? (
            <ClosedCashiers />
          ) : (
            <Button onClick={() => setIsAsksPermitionModalOpen(true)}>
              Acessar Caixas
            </Button>
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Layout>
);
