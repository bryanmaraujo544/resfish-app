import {
  Flex,
  Icon,
  Button,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { BsPlus, BsDash, BsFillTrashFill } from 'react-icons/bs';
import { BiSad } from 'react-icons/bi';

import { formatDecimalNum } from 'utils/formatDecimalNum';
import { FaArrowUp } from 'react-icons/fa';

const columns = [
  {
    text: 'Nome',
    prop: 'name',
  },
  {
    text: 'Quantidade',
    prop: 'amount',
  },
  {
    text: 'Preço Unid',
    prop: 'unitPrice',
  },
  {
    text: 'Total',
    prop: 'total',
  },
];

type Props = {
  products: any[];
  // eslint-disable-next-line no-unused-vars
  handleIncrementProductAmount: ({ id }: { id: string }) => void;
  // eslint-disable-next-line no-unused-vars
  handleDecrementProductAmount: ({ id }: { id: string }) => void;
  // eslint-disable-next-line no-unused-vars
  handleOpenDeleteModal: ({ productId }: { productId: string }) => void;
  handleToggleOrderByDir: () => void;

  orderBy: string;
  orderByDir: 'asc' | 'desc';
};

export const ProductsListLayout = ({
  products,
  handleIncrementProductAmount,
  handleDecrementProductAmount,
  handleOpenDeleteModal,
  orderBy,
  orderByDir,
  handleToggleOrderByDir,
}: Props) => (
  <TableContainer mt={16}>
    <Table>
      <Thead>
        <Tr>
          {columns.map(({ text, prop }) => (
            <Th key={`products-list-header${prop}`}>
              <Flex align="center" gap={2}>
                {text}
                {orderBy.toLowerCase() === prop.toLowerCase() && (
                  <motion.div
                    onClick={() => handleToggleOrderByDir()}
                    style={{
                      transform:
                        orderByDir === 'asc'
                          ? 'rotate(0deg)'
                          : 'rotate(180deg)',
                      cursor: 'pointer',
                    }}
                  >
                    <Icon as={FaArrowUp} fontSize={14} />
                  </motion.div>
                )}
              </Flex>
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {products?.length > 0 &&
          products?.map(({ _id, name, amount, unitPrice }: any) => (
            <Tr key={`product-list${name}`} h={20}>
              <Td>{name}</Td>
              <Td>
                <Flex gap={4}>
                  <Icon
                    onClick={() => handleDecrementProductAmount({ id: _id })}
                    as={BsDash}
                    fontSize={[20, 22, 24]}
                    rounded={2}
                    bg="gray.50"
                    boxShadow="sm"
                    cursor="pointer"
                    _hover={{ bg: 'blue.100' }}
                    _active={{ bg: 'blue.50' }}
                  />
                  <Text>{amount}</Text>
                  <Icon
                    onClick={() => handleIncrementProductAmount({ id: _id })}
                    as={BsPlus}
                    fontSize={[20, 22, 24]}
                    rounded={2}
                    bg="gray.50"
                    boxShadow="sm"
                    cursor="pointer"
                    _hover={{ bg: 'blue.100' }}
                    _active={{ bg: 'blue.50' }}
                  />
                </Flex>
              </Td>
              <Td>
                R${' '}
                {formatDecimalNum({ num: unitPrice.toString(), to: 'comma' })}
              </Td>
              <Td>
                R${' '}
                {formatDecimalNum({
                  num: (amount * unitPrice).toFixed(2).toString(),
                  to: 'comma',
                })}
              </Td>
              <Td isNumeric>
                <Button
                  bg="red.50"
                  p={0}
                  onClick={() => handleOpenDeleteModal({ productId: _id })}
                >
                  <Icon as={BsFillTrashFill} color="red.600" />
                </Button>
              </Td>
            </Tr>
          ))}
        {products?.length === 0 && (
          <Tr>
            <Td>
              <Flex align="center" gap={4} mt={4} color="blue.700">
                <Icon as={BiSad} fontSize={32} />
                <Text fontSize={20} fontWeight={600}>
                  Nenhum produto encontrado
                </Text>
              </Flex>
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  </TableContainer>
);
