import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Command as CommandComponent } from 'pages-components/Command';

const Command: NextPage = () => {
  const {
    query: { id },
  } = useRouter();
  console.log({ id });

  return <CommandComponent commandId={id} />;
};

export default Command;
