import { TabList, Tabs, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import { ClosedCashiers } from './components/ClosedCashiers';
import { PayedCommands } from './components/PayedCommands';

export const HomeLayout = () => (
  <Layout>
    <Header />
    <Tabs>
      <TabList mb={[2, 4]}>
        <Tab>Comandas Pagas</Tab>
        <Tab>Caixas Fechados</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <PayedCommands />
        </TabPanel>
        <TabPanel>
          <ClosedCashiers />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Layout>
);
