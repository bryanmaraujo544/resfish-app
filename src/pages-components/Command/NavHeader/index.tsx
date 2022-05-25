import { useContext, useCallback } from 'react';
import { CommandContext } from '..';
import { NavHeaderLayout } from './layout';

export const NavHeader = () => {
  console.log('nav header');
  const {
    filter,
    setFilter,
    orderBy,
    setOrderBy,
    searchContent,
    setSearchContent,
  } = useContext(CommandContext);

  const handleChangeFilter = useCallback(
    (newFilter: string) => {
      setFilter((prev) => (prev === newFilter ? '' : newFilter));
    },
    [setFilter]
  );

  const handleChangeOrderBy = useCallback(
    (newOrderBy: string) => {
      setOrderBy((prev) => (prev === newOrderBy ? '' : newOrderBy));
    },
    [setOrderBy]
  );

  return (
    <NavHeaderLayout
      filter={filter}
      orderBy={orderBy}
      searchContent={searchContent}
      handleChangeOrderBy={handleChangeOrderBy}
      handleChangeFilter={handleChangeFilter}
      setSearchContent={setSearchContent}
    />
  );
};
