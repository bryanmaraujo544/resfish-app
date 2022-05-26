import { Dispatch, SetStateAction } from 'react';
import { AddProductModalLayout } from './layout';

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
    name: 'Coca-Cola',
    category: 'Bebidas',
    amount: 56,
    unitPrice: 7.9,
    id: Math.random().toFixed(4),
  },
];

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddProductModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <AddProductModalLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      products={mockProducts}
    />
  );
};
