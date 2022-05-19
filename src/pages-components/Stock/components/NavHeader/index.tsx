import { NavHeaderLayout } from './layout';

interface Props {
  filters: string[];
  setFilters: any;
  orderBy: string;
  setOrderBy: any;
}

export const NavHeader = ({
  orderBy,
  filters,
  setOrderBy,
  setFilters,
}: Props) => {
  console.log('navheader');

  function handleSetFilter(filter: string) {
    setFilters((prevFilters: string[]) => {
      const alreadyHasFilter = prevFilters.some(
        (text: string) => text === filter
      );
      if (alreadyHasFilter) {
        return prevFilters.filter((text: string) => text !== filter);
      }

      return [...prevFilters, filter];
    });
  }

  function handleSetOrderBy(order: string) {
    setOrderBy((prevOrder: string) => {
      if (prevOrder === order) {
        return '';
      }

      return order;
    });
  }

  return (
    <NavHeaderLayout
      filters={filters}
      orderBy={orderBy}
      handleSetFilter={handleSetFilter}
      handleSetOrderBy={handleSetOrderBy}
    />
  );
};
