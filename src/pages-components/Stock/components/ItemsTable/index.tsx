/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useMemo, useState } from 'react';
import { StockContext } from 'pages-components/Stock';
import { formatDecimalNum } from 'utils/formatDecimalNum';
import { Item } from 'pages-components/Stock/types/Item';
import { ItemsTableLayout } from './layout';
import { EditModal } from '../EditModal';
import { DeleteItemModal } from '../DeleteItemModal';

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
