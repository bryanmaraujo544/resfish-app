import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';

import { Cashier as CashierComponent } from 'pages-components/Cashier';

const Cashier: NextPage = () => {
  const {
    query: { id },
  } = useRouter();

  return <CashierComponent cashierId={id as string} />;
};

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

export default Cashier;
