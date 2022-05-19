import { useEffect, useState } from 'react';

import { StockLayout } from './layout';
import { EditModal } from './components/EditModal';
import type { Item } from './types/Item';

export const Stock = () => {
  const [id, setId] = useState(null as null | number | string);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(null as null | number);
  const [unitPrice, setUnitPrice] = useState('R$');

  const [filters, setFilters] = useState([] as string[]);
  const [orderBy, setOrderBy] = useState('');
  const [orderByDir, setOrderByDir] = useState<'asc' | 'desc'>('asc');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (orderByDir === 'asc') {
      console.log({ orderBy, orderByDir });
      return;
    }

    console.log('é desc', { orderBy, orderByDir });
  }, [orderByDir, orderBy]);

  function handleOpenEditModal(itemInfos: Item) {
    setId(itemInfos.id);
    setName(itemInfos.name);
    setImage(itemInfos.image);
    setAmount(itemInfos.amount);
    setUnitPrice(`R$ ${itemInfos.unitPrice.toString()}`);
    setCategory(itemInfos.category);

    setIsEditModalOpen(true);
  }

  function handleToggleOrderByDir() {
    setOrderByDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }

  return (
    <>
      <EditModal
        itemInfos={{
          id,
          name,
          image,
          amount,
          unitPrice,
          setName,
          setImage,
          setAmount,
          setUnitPrice,
          category,
          setCategory,
        }}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />
      <StockLayout
        handleOpenEditModal={handleOpenEditModal}
        filters={filters}
        setFilters={setFilters}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        handleToggleOrderByDir={handleToggleOrderByDir}
        orderByDir={orderByDir}
      />
      ;
    </>
  );
};
