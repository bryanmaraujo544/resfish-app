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
  Heading,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { Cashier } from 'types/Cashier';

import { MdOutlineReadMore } from 'react-icons/md';
import { Dispatch, SetStateAction } from 'react';
import { parseToBRL } from 'utils/parseToBRL';
import { NavHeader } from './NavHeader';

const columns = ['Data', 'Total', 'Comandas', ''];
interface Props {
  allCashiers: Cashier[];
  handleGoToCashierPage: (cashierId: string) => void;
  handleDownloadCashiers: (e: any) => void;
  year: string;
  setYear: Dispatch<SetStateAction<string>>;
  month: string;
  setMonth: Dispatch<SetStateAction<string>>;
}

export const ClosedCashiersLayout = ({
  allCashiers,
  handleGoToCashierPage,
  handleDownloadCashiers,
  month,
  setMonth,
  setYear,
  year,
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
      <NavHeader
        handleDownloadCashiers={handleDownloadCashiers}
        month={month}
        setMonth={setMonth}
        setYear={setYear}
        year={year}
        allCashiers={allCashiers}
      />
      {/* <Button onClick={handleDownloadCashiers}>Baixar Caixas</Button> */}
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
            {allCashiers?.length > 0 ? (
              allCashiers?.map(({ _id, date, total, payments }) => (
                <Tr key={`cashier-oflist-${_id}`}>
                  <Td>{formatDate(date)}</Td>
                  <Td>{parseToBRL(total || 0)}</Td>
                  <Td>{payments?.length}</Td>
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
              ))
            ) : (
              <Tr>
                <Td w="100%">
                  <Heading
                    as="span"
                    fontSize={[18, 20, 24]}
                    color="blue.700"
                    bg="blue.50"
                    rounded={4}
                    py={2}
                    px={4}
                  >
                    Nenhum caixa fechado neste mês e ano
                  </Heading>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
