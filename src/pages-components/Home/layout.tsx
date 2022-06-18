import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import { PayedCommands } from './components/PayedCommands';

export const HomeLayout = () => (
  <Layout>
    <Header />
    <PayedCommands />
  </Layout>
);
