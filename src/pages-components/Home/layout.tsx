import { TabList, Tabs, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import { PayedCommands } from './components/PayedCommands';

export const HomeLayout = () => (
  <Layout>
    <Header />
    <Tabs>
      <TabList mb={[2, 4]}>
        <Tab>Comandas Pagas</Tab>
        <Tab>Infos Caixa</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <PayedCommands />
        </TabPanel>
        <TabPanel>caixa</TabPanel>
      </TabPanels>
    </Tabs>
  </Layout>
);
