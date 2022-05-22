import { Dispatch, SetStateAction } from 'react';

export type ContextProps = {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  orderBy: string;
  setOrderBy: Dispatch<SetStateAction<string>>;
};
