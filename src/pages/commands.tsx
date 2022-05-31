import { GetServerSideProps, NextPage } from 'next';
import nookies from 'nookies';
import { Commands as CommandsComponent } from 'pages-components/Commands';

const Commands: NextPage = () => <CommandsComponent />;

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

export default Commands;
