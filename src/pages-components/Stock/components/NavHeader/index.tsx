import { useState } from 'react';
import { NavHeaderLayout } from './layout';

export const NavHeader = () => {
  console.log('navheader');
  const [filters, setFilters] = useState([] as string[]);
  const [orderBy, setOrderBy] = useState('');

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
