import {
  Stack,
  Button,
  Text,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import { Order } from '../types/Order';

const productColumns = [
  {
    text: 'Nome',
    prop: 'name',
  },
  {
    text: 'Quantidade',
    prop: 'amount',
  },
  { text: '', prop: '*' },
];

interface Props {
  order: Order;
}

export const OrderLayout = ({ order }: Props) => {
  console.log('orderlayout', { order });
  return (
    <Stack
      bg="blue.50"
      p={[2, 4]}
      rounded={[2, 4]}
      mt={[4, 6]}
      border="1px solid"
      borderColor="gray.300"
      gap={[2, 4]}
    >
      <Text color="blue.800" fontSize={[18, 20]} fontWeight={600}>
        Mesa:{' '}
        <Text display="inline-block" fontWeight={700}>
          {order.table}
        </Text>
      </Text>

      <TableContainer
        bg="whiteAlpha.700"
        // bg="blue.50"
        color="blue.900"
        py={[2, 3]}
        rounded={4}
        boxShadow="sm"
      >
        <Table size="md" textAlign="left">
          <Thead>
            <Tr>
              {productColumns.map((column) => (
                <Th
                  key={`kitchen-order-product-column-${column.prop}`}
                  color="blue.900"
                >
                  {column.text}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {order.products.map(({ _id, name, amount }) => (
              <Tr key={`${order._id}${_id}`}>
                <Td w="50%">{name}</Td>
                <Td w="40%">{amount}</Td>
                <Td isNumeric>
                  <Button>Marcar como feito</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Button colorScheme="blue">Marcar como Feito</Button>
    </Stack>
  );
};
