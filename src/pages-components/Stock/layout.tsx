import {
  // Flex,
  // Grid,
  // GridItem,
  TableContainer,
  // Text,
  Table,
  Th,
  Thead,
  Tr,
  Td,
  Tbody,
} from '@chakra-ui/react';
import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import Image from 'next/image';
import { NavHeader } from './components/NavHeader';

const stockColumns = ['Image', 'Nome', 'Categoria', 'Qntd', 'Preço Unid.'];

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
];

interface Props {
  handleOpenEditModal: any;
}

export const StockLayout = ({ handleOpenEditModal }: Props) => (
  <Layout>
    <Header />
    <NavHeader />
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {stockColumns.map((column) => (
              <Th>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {mockProducts.map(
            ({ id, image, amount, category, unitPrice, name }) => (
              <Tr
                key={id}
                cursor="pointer"
                _hover={{
                  bg: 'blue.50',
                }}
                onClick={() =>
                  handleOpenEditModal({
                    name,
                    image,
                    id,
                    amount,
                    unitPrice,
                    category,
                  })
                }
              >
                <Td>
                  <Image src={image} width={32} height={32} objectFit="cover" />
                </Td>
                <Td>{name}</Td>
                <Td>{category}</Td>
                <Td>{amount}</Td>
                <Td>{unitPrice}</Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </TableContainer>
  </Layout>
);
