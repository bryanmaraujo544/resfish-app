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
import { BsPlus, BsDash, BsFillTrashFill } from 'react-icons/bs';

import { formatDecimalNum } from 'utils/formatDecimalNum';

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

export const ProductsListLayout = ({
  products,
  handleIncrementProductAmount,
  handleDecrementProductAmount,
  handleOpenDeleteModal,
}: any) => (
  <TableContainer mt={16}>
    <Table>
      <Thead>
        <Tr>
          {columns.map(({ text, prop }) => (
            <Th key={`products-list-header${prop}`}>{text}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {products?.map(({ id, name, amount, unitPrice }: any) => (
          <Tr key={`product-list${name}`} h={20}>
            <Td>{name}</Td>
            <Td>
              <Flex gap={4}>
                <Icon
                  onClick={() => handleDecrementProductAmount({ id })}
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
                  onClick={() => handleIncrementProductAmount({ id })}
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
              R$ {formatDecimalNum({ num: unitPrice.toString(), to: 'comma' })}
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
                onClick={() => handleOpenDeleteModal({ productId: id })}
              >
                <Icon as={BsFillTrashFill} color="red.600" />
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </TableContainer>
);
