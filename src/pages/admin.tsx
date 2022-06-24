import { GetServerSideProps, NextPage } from 'next';
import nookies from 'nookies';
import { Admin as AdminComponent } from 'pages-components/Admin';

const Admin: NextPage = () => <AdminComponent />;

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

export default Admin;
