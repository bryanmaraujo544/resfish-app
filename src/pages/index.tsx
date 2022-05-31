import type { GetServerSideProps, NextPage } from 'next';
import nookies from 'nookies';
import { Home as HomeComponent } from '../pages-components/Home';

const Home: NextPage = () => <HomeComponent />;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const { isAuthorized } = cookies;

  if (!isAuthorized) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Home;
