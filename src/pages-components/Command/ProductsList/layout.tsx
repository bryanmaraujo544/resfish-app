import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import { formatDecimalNum } from 'utils/formatDecimalNum';

const columns = [
  {
    text: 'Nome',
    prop: 'name',
  },
  {
    text: 'Quantidade',
    prop: 'name',
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

export const ProductsListLayout = ({ products }: any) => (
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
        {products.map(({ name, amount, unitPrice }: any) => (
          <Tr key={`product-list${name}`} h={20}>
            <Td>{name}</Td>
            <Td>{amount}</Td>
            <Td>
              R$ {formatDecimalNum({ num: unitPrice.toString(), to: 'comma' })}
            </Td>
            <Td>
              R${' '}
              {formatDecimalNum({
                num: (amount * unitPrice).toString(),
                to: 'comma',
              })}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </TableContainer>
);
