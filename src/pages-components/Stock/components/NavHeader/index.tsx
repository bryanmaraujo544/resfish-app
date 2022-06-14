import { StockContext } from 'pages-components/Stock';
import { useContext, Dispatch, SetStateAction } from 'react';
import { NavHeaderLayout } from './layout';

interface Props {
  filters: string;
  setFilters: Dispatch<SetStateAction<string>>;
  orderBy: string;
  setOrderBy: any;
}

export const NavHeader = ({
  orderBy,
  filters,
  setOrderBy,
  setFilters,
}: Props) => {
  const { searchContent, setSearchContent } = useContext(StockContext);

  function handleSetFilter(filter: string) {
    setFilters((prevFilter: string) => {
      if (prevFilter === filter) {
        return '';
      }

      return filter;
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

  function handleSearchItems(e: any) {
    setSearchContent(e.target.value);
  }

  return (
    <NavHeaderLayout
      filters={filters}
      orderBy={orderBy}
      handleSetFilter={handleSetFilter}
      handleSetOrderBy={handleSetOrderBy}
      searchContent={searchContent}
      handleSearchItems={handleSearchItems}
    />
  );
};
