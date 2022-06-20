import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Flex,
  TableContainer,
  Table,
  Th,
  Thead,
  Tr,
  Td,
  Tbody,
  Icon,
} from '@chakra-ui/react';
import { FaArrowUp } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';

import { formatDecimalNum } from 'utils/formatDecimalNum';
import { Product } from 'pages-components/Stock/types/Product';

const stockColumns = [
  { text: 'Imagem', prop: 'image' },
  { text: 'Nome', prop: 'name' },
  { text: 'Categoria', prop: 'category' },
  { text: 'Qntd', prop: 'amount' },
  { text: 'Preço unid.', prop: 'unitPrice' },
];

type LayoutProps = {
  handleOpenEditModal: any;
  handleToggleOrderByDir: any;
  handleOpenDeleteItemModal: any;
  orderByDir: 'asc' | 'desc';
  orderBy: string;
  items: Product[];
};

export const ItemsTableLayout = ({
  orderByDir,
  handleToggleOrderByDir,
  handleOpenEditModal,
  handleOpenDeleteItemModal,
  orderBy,
  items,
}: LayoutProps) => {
  function isColumnSelectedToOrder(column: string) {
    return column.toLocaleLowerCase() === orderBy.toLocaleLowerCase();
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {stockColumns.map(({ text, prop }) => (
              <Th key={`header-${prop}`}>
                <Flex align="center" gap={2}>
                  {text}{' '}
                  {isColumnSelectedToOrder(prop) === true && (
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
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {items.map(({ _id, imageURL, amount, category, unitPrice, name }) => (
            <Tr
              key={`stock-product-_id${_id}`}
              cursor="pointer"
              _hover={{
                bg: 'blue.50',
              }}
            >
              <Td>
                <Image
                  src="https://wallpaperaccess.com/full/5227230.png"
                  width={32}
                  height={32}
                  objectFit="cover"
                  alt="product-image"
                />
              </Td>
              <Td>{name}</Td>
              <Td>{category}</Td>
              <Td>{amount}</Td>
              <Td>
                R${' '}
                {formatDecimalNum({ num: unitPrice.toString(), to: 'comma' })}
              </Td>
              <Td>
                {/* <Button></Button> */}
                <Flex gap={2} align="center" color="blue.800">
                  <Icon
                    onClick={() =>
                      handleOpenEditModal({
                        name,
                        image: imageURL,
                        id: _id,
                        amount,
                        unitPrice,
                        category,
                      })
                    }
                    as={FiEdit2}
                    fontSize={[16, 18]}
                    _hover={{ color: 'blue.500' }}
                  />
                  <Icon
                    onClick={() => handleOpenDeleteItemModal({ itemId: _id })}
                    as={AiOutlineDelete}
                    fontSize={[20, 22]}
                    _hover={{ color: 'red.400' }}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
