/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useMemo } from 'react';
import { StockContext } from 'pages-components/Stock';
import { ItemsTableLayout } from './layout';

const mockProducts = [
  {
    image:
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
    name: 'Pesque-Pague',
    category: 'Pesca',
    amount: null,
    unitPrice: 0,
    id: Math.random().toFixed(4),
  },
  {
    image:
      'https://user-images.githubusercontent.com/62571814/168487287-6b0c1c98-d2d6-4827-87dd-998048561057.png',
    name: 'Pesca Esportiva',
    category: 'Pesca',
    amount: null,
    unitPrice: 25.9,
    id: Math.random().toFixed(4),
  },
  {
    image:
      'https://user-images.githubusercontent.com/62571814/168487287-6b0c1c98-d2d6-4827-87dd-998048561057.png',
    name: 'Pesca Esportiva',
    category: 'Bebidas',
    amount: null,
    unitPrice: 25.9,
    id: Math.random().toFixed(4),
  },
];

export const ItemsTable = () => {
  const {
    handleOpenEditModal,
    handleToggleOrderByDir,
    orderByDir,
    orderBy,
    filters,
    searchContent,
  } = useContext(StockContext);
  console.log('searchContent', searchContent);

  const filteredByFilter = useMemo(() => {
    const filtered = mockProducts.filter(
      ({ category }) => category === filters
    );

    return filtered.length > 0 ? filtered : mockProducts;
  }, [filters]);

  const filteredBySort = useMemo(
    () =>
      filteredByFilter.sort((a: any, b: any) => {
        if (orderByDir === 'asc') {
          if (a[orderBy] < b[orderBy]) {
            return -1;
          }
          if (b[orderBy] < a[orderBy]) {
            return 1;
          }
          return 0;
        }

        if (a[orderBy] > b[orderBy]) {
          return -1;
        }
        if (b[orderBy] < a[orderBy]) {
          return 1;
        }
        return 0;
      }),
    [orderBy, orderByDir, filteredByFilter]
  );

  // console.log({ filteredByFilter });

  const filteredBySearch = useMemo(
    () =>
      filteredBySort.filter((item) => {
        const itemsArr = Object.values(item).join('').toLowerCase();
        if (itemsArr.includes(searchContent.toLowerCase())) {
          return true;
        }
        return false;
      }),
    [searchContent, filteredBySort, orderByDir]
  );

  return (
    <ItemsTableLayout
      orderBy={orderBy}
      orderByDir={orderByDir}
      handleOpenEditModal={handleOpenEditModal}
      handleToggleOrderByDir={handleToggleOrderByDir}
      items={filteredBySearch}
    />
  );
};
