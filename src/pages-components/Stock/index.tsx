import { useState } from 'react';

import { StockLayout } from './layout';
import { EditModal } from './components/EditModal';
import type { Item } from './types/Item';

export const Stock = () => {
  const [id, setId] = useState(null as null | number | string);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [amount, setAmount] = useState(null as null | number);
  const [unitPrice, setUnitPrice] = useState(0);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  function handleOpenEditModal(itemInfos: Item) {
    setId(itemInfos.id);
    setName(itemInfos.name);
    setImage(itemInfos.image);
    setAmount(itemInfos.amount);
    setUnitPrice(itemInfos.unitPrice);

    setIsEditModalOpen(true);
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
        }}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />
      <StockLayout handleOpenEditModal={handleOpenEditModal} />;
    </>
  );
};
