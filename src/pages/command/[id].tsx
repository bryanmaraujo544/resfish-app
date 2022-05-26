import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Command as CommandComponent } from 'pages-components/Command';

const Command: NextPage = () => {
  const {
    query: { id },
  } = useRouter();

  return <CommandComponent commandId={id} />;
};

export default Command;
