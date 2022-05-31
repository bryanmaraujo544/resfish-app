import { NextPage, GetServerSideProps } from 'next';
import nookies from 'nookies';
import { Kitchen as KitchenComponent } from 'pages-components/Kitchen';

const Kitchen: NextPage = () => <KitchenComponent />;

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

export default Kitchen;
