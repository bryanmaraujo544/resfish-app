import { Order } from '../../../types/Order';

const orders: Order[] = [
  {
    _id: 'fdkj3333l233',
    observation: 'limão com coca',
    table: 'Monica',
    waiter: 'Julio',
    products: [
      {
        _id: 'coquinhafkjfdk3333',
        name: 'Coca-Cola',
        isMade: true,
        category: 'Bebidas',
        amount: 3,
      },
      {
        _id: 'porçõafdfkjfdk3333',
        name: 'Porções',
        category: 'Porção de tilápica',
        amount: 3,
      },
      {
        _id: 'pratosfkjfdk3333',
        name: 'Pratos',
        category: 'Arroz com feijão',
        amount: 4,
      },
    ],
  },
  {
    _id: 'fdkddad3',
    observation: 'Pouco sal no arroz',
    table: 'Cazé',
    waiter: 'Diego',
    products: [
      {
        _id: 'cocaaafkjfdk3333',
        name: 'Coca-Cola',
        category: 'Bebidas',
        amount: 3,
      },
      {
        _id: 'porçoesfkjfdk3333',
        name: 'Porções',
        category: 'Porção de tilápica',
        amount: 3,
      },
      {
        _id: 'arrozfkjfdk3333',
        name: 'Pratos',
        category: 'Arroz com feijão',
        amount: 4,
      },
    ],
  },
  {
    _id: 'fdkj3333lddfdfdf3LL3',
    observation: 'limão com coca',
    table: 'Ashley',
    waiter: 'Julio',
    products: [
      {
        _id: 'cocafkjfdk3333',
        name: 'Coca-Cola',
        category: 'Bebidas',
        amount: 3,
      },
      {
        _id: 'porçõesfkjfdk3333',
        name: 'Porções',
        category: 'Porção de tilápica',
        amount: 3,
      },
      {
        _id: 'arrozfkjfdk3333',
        name: 'Pratos',
        category: 'Arroz com feijão',
        amount: 4,
      },
    ],
  },
];

export default orders;
