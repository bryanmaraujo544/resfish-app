import { useRouter } from 'next/router';
import { HeaderLayout } from './layout';

export const Header = () => {
  const router = useRouter();

  function handleLinkToPage(path: string) {
    router.push(path);
  }

  return <HeaderLayout handleLinkToPage={handleLinkToPage} />;
};
