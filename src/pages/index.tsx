import type { GetServerSideProps, NextPage } from 'next';
import { Home as HomeComponent } from '../pages-components/Home';

const Home: NextPage = () => <HomeComponent />;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return {
//     redirect: {
//       destination: '/login',
//       permanent: false,
//     },
//   };
// };

export default Home;
