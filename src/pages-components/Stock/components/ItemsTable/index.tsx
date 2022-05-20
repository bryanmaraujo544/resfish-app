import { useContext } from 'react';
import { StockContext } from 'pages-components/Stock';
import { ItemsTableLayout } from './layout';

export const ItemsTable = () => {
  const { handleOpenEditModal, handleToggleOrderByDir, orderByDir, orderBy } =
    useContext(StockContext);

  return (
    <ItemsTableLayout
      orderBy={orderBy}
      orderByDir={orderByDir}
      handleOpenEditModal={handleOpenEditModal}
      handleToggleOrderByDir={handleToggleOrderByDir}
    />
  );
};
