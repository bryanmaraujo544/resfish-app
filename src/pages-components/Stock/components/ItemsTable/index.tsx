/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useMemo, useState } from 'react';

import { StockContext } from 'pages-components/Stock';
import { formatDecimalNum } from 'utils/formatDecimalNum';
import { Item } from 'pages-components/Stock/types/Item';
import { ItemsTableLayout } from './layout';
import { EditModal } from '../EditModal';
import { DeleteItemModal } from '../DeleteItemModal';
import StockService from '../../services';

export const ItemsTable = () => {
  const [id, setId] = useState(null as null | number | string);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(null as null | number);
  const [unitPrice, setUnitPrice] = useState('');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteItemModalOpen, setIsDeleteItemModalOpen] = useState(false);

  const {
    handleToggleOrderByDir,
    orderByDir,
    orderBy,
    filters,
    searchContent,
    products,
    productsDispatch,
    isLoading,
  } = useContext(StockContext);

  const filteredByFilter = useMemo(() => {
    if (filters) {
      const filtered = products.filter(({ category }) => category === filters);
      return filtered;
    }

    return products;
  }, [filters, products]);

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

  const handleOpenEditModal = useCallback((itemInfos: Item) => {
    setId(itemInfos.id);
    setName(itemInfos.name);
    setImage(itemInfos.image);
    setAmount(itemInfos.amount);
    setUnitPrice(
      `${formatDecimalNum({
        num: itemInfos.unitPrice.toString(),
        to: 'comma',
      })}`
    );
    setCategory(itemInfos.category);

    setIsEditModalOpen(true);
  }, []);

  const handleOpenDeleteItemModal = useCallback(
    ({ itemId }: { itemId: string }) => {
      setId(itemId);
      setIsDeleteItemModalOpen(true);
    },
    []
  );

  const handleFavoriteProduct = useCallback(
    async (_id: string) => {
      productsDispatch({
        type: 'FAVORITE-PRODUCT',
        payload: { product: { _id } },
      });

      await StockService.updateFavoriteStatus({
        productId: _id,
        isFavorite: true,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [products, productsDispatch]
  );

  const handleUnfavoriteProduct = useCallback(
    async (_id: string) => {
      productsDispatch({
        type: 'UNFAVORITE-PRODUCT',
        payload: { product: { _id } },
      });

      await StockService.updateFavoriteStatus({
        productId: _id,
        isFavorite: false,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [products, productsDispatch]
  );

  return (
    <>
      <ItemsTableLayout
        orderBy={orderBy}
        orderByDir={orderByDir}
        handleOpenEditModal={handleOpenEditModal}
        handleToggleOrderByDir={handleToggleOrderByDir}
        handleOpenDeleteItemModal={handleOpenDeleteItemModal}
        items={filteredBySearch}
        handleFavoriteProduct={handleFavoriteProduct}
        handleUnfavoriteProduct={handleUnfavoriteProduct}
        isLoading={isLoading}
      />
      <EditModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        itemInfos={{
          id,
          name,
          setName,
          category,
          setCategory,
          image,
          setImage,
          amount,
          setAmount,
          unitPrice,
          setUnitPrice,
        }}
      />
      <DeleteItemModal
        id={id}
        isModalOpen={isDeleteItemModalOpen}
        setIsModalOpen={setIsDeleteItemModalOpen}
      />
    </>
  );
};
