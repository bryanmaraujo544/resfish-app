import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Flex,
  TableContainer,
  // Text,
  Table,
  Th,
  Thead,
  Tr,
  Td,
  Tbody,
  Icon,
} from '@chakra-ui/react';
import { FaArrowUp } from 'react-icons/fa';

const stockColumns = ['Imagem', 'Nome', 'Categoria', 'Qntd', 'Preço Unid.'];

type LayoutProps = {
  handleOpenEditModal: any;
  handleToggleOrderByDir: any;
  orderByDir: 'asc' | 'desc';
  orderBy: string;
};

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

export const ItemsTableLayout = ({
  orderByDir,
  handleToggleOrderByDir,
  handleOpenEditModal,
  orderBy,
}: LayoutProps) => {
  console.log('items table layout');
  function isColumnSelectedToOrder(column: string) {
    return column.toLocaleLowerCase() === orderBy.toLocaleLowerCase();
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {stockColumns.map((column) => (
              <Th>
                <Flex align="center" gap={2}>
                  {column}{' '}
                  {isColumnSelectedToOrder(column) === true && (
                    <motion.div
                      style={{
                        transform:
                          orderByDir === 'asc'
                            ? 'rotate(0deg)'
                            : 'rotate(180deg)',
                      }}
                    >
                      <Icon
                        as={FaArrowUp}
                        fontSize={16}
                        color="blue.800"
                        onClick={() => handleToggleOrderByDir()}
                        cursor="pointer"
                      />
                    </motion.div>
                  )}
                </Flex>
              </Th>
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
  );
};
