/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { StockContext } from 'pages-components/Stock';
import { formatDecimalNum } from 'utils/formatDecimalNum';
import { Item } from 'pages-components/Stock/types/Item';
import { Product } from 'pages-components/Stock/types/Product';
import StockService from '../../services/index';
import { ItemsTableLayout } from './layout';
import { EditModal } from '../EditModal';
import { DeleteItemModal } from '../DeleteItemModal';

export const ItemsTable = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [id, setId] = useState(null as null | number | string);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(null as null | number);
  const [unitPrice, setUnitPrice] = useState('R$');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteItemModalOpen, setIsDeleteItemModalOpen] = useState(false);

  const {
    handleToggleOrderByDir,
    orderByDir,
    orderBy,
    filters,
    searchContent,
  } = useContext(StockContext);

  useEffect(() => {
    (async () => {
      const allProducts = await StockService.getAllProducts();
      setProducts(allProducts);
    })();
  }, []);

  console.log('PRODUCTS', products);

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
      `R$ ${formatDecimalNum({
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

  return (
    <>
      <ItemsTableLayout
        orderBy={orderBy}
        orderByDir={orderByDir}
        handleOpenEditModal={handleOpenEditModal}
        handleToggleOrderByDir={handleToggleOrderByDir}
        handleOpenDeleteItemModal={handleOpenDeleteItemModal}
        items={filteredBySearch}
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
