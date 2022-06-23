import {
  Button,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Icon,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { Cashier } from 'types/Cashier';
import { formatDecimalNum } from 'utils/formatDecimalNum';

import { MdOutlineReadMore } from 'react-icons/md';

const columns = ['Data', 'Total', 'Comandas', ''];
interface Props {
  allCashiers: Cashier[];
  handleGoToCashierPage: (cashierId: string) => void;
  handleDownloadCashiers: (e: any) => void;
}

export const ClosedCashiersLayout = ({
  allCashiers,
  handleGoToCashierPage,
  handleDownloadCashiers,
}: Props) => {
  function formatDate(date: any) {
    const dt = DateTime.fromISO(date, {
      zone: 'pt-BR',
      setZone: true,
    }).setLocale('pt-BR');
    return dt.toLocaleString(DateTime.DATE_FULL);
  }

  return (
    <Stack>
      <Button onClick={handleDownloadCashiers}>Baixar Caixas</Button>
      <TableContainer>
        <Table size="lg">
          <Thead>
            <Tr>
              {columns.map((column) => (
                <Th key={`closed-cashier-column-${column}`}>{column}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {allCashiers.map(({ _id, date, total, payments }) => (
              <Tr key={`cashier-oflist-${_id}`}>
                <Td>{formatDate(date)}</Td>
                <Td>
                  R$ {formatDecimalNum({ num: total.toString(), to: 'comma' })}
                </Td>
                <Td>{payments.length}</Td>
                <Td isNumeric>
                  <Button
                    onClick={() => handleGoToCashierPage(_id)}
                    colorScheme="blue"
                    fontSize={[14, 16]}
                  >
                    Ver Mais{' '}
                    <Icon as={MdOutlineReadMore} ml={2} fontSize={[16, 18]} />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
