import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';

import { Command as CommandComponent } from 'pages-components/Command';

const Command: NextPage = () => {
  const {
    query: { id },
  } = useRouter();

  return <CommandComponent commandId={id} />;
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

export default Command;
