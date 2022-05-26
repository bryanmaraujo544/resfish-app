import { useContext, useCallback } from 'react';
import { CommandContext } from '../../index';
import { NavHeaderLayout } from './layout';

export const NavHeader = () => {
  const {
    filter,
    setFilter,
    orderBy,
    setOrderBy,
    searchContent,
    setSearchContent,
    setIsAddProductModalOpen,
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

  const handleOpenAddProductModal = useCallback(() => {
    setIsAddProductModalOpen(true);
  }, []);

  return (
    <NavHeaderLayout
      filter={filter}
      orderBy={orderBy}
      searchContent={searchContent}
      handleChangeOrderBy={handleChangeOrderBy}
      handleChangeFilter={handleChangeFilter}
      setSearchContent={setSearchContent}
      handleOpenAddProductModal={handleOpenAddProductModal}
    />
  );
};
