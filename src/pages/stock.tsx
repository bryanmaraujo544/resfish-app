import { NextPage, GetServerSideProps } from 'next';
import nookies from 'nookies';
import { Stock as StockComponent } from 'pages-components/Stock';

const Stock: NextPage = () => <StockComponent />;

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

export default Stock;
