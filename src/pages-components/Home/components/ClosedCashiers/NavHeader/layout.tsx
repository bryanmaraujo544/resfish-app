import { Button, Grid, Stack, Text, Flex, Select } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { parseToBRL } from 'utils/parseToBRL';

interface Props {
  handleDownloadCashiers: (e: any) => void;
  year: string;
  setYear: Dispatch<SetStateAction<string>>;
  month: string;
  setMonth: Dispatch<SetStateAction<string>>;
  totalValue: number;
  totalCommands: number;
}

const cashiersMonthOptions = [
  'Todos',
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const cashiersYearOptions = [
  'Todos',
  '2022',
  '2023',
  '2024',
  '2025',
  '2026',
  '2027',
  '2028',
  '2030',
];

export const NavHeaderLayout = ({
  handleDownloadCashiers,
  month,
  setMonth,
  setYear,
  year,
  totalCommands,
  totalValue,
}: Props) => (
  <Stack gap={2}>
    <Grid gridTemplateColumns={['1fr 1fr']} gap={4}>
      <Stack color="blue.800">
        <Text fontWeight={600}>Mês</Text>
        <Select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          fontWeight={600}
        >
          {cashiersMonthOptions.map((m) => (
            <option key={`cashiers-month-${m}`}>{m}</option>
          ))}
        </Select>
      </Stack>
      <Stack color="blue.800">
        <Text fontWeight={600}>Ano</Text>
        <Select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          fontWeight={600}
        >
          {cashiersYearOptions.map((y) => (
            <option key={`cashiers-year-${y}`}>{y}</option>
          ))}
        </Select>
      </Stack>
    </Grid>
    <Flex w="100%" justify="space-between" gap={4}>
      <Text
        fontWeight={600}
        fontSize={[14, 16, 18]}
        color="blue.700"
        bg="blue.50"
        padding={2}
        px={4}
        rounded={4}
        flex="1"
        textAlign="center"
      >
        Valor Total: {parseToBRL(totalValue || 0)}
      </Text>
      <Text
        fontWeight={600}
        fontSize={[14, 16, 18]}
        color="blue.700"
        bg="blue.50"
        padding={2}
        px={4}
        rounded={4}
        flex="1"
        textAlign="center"
      >
        Comandas: {totalCommands}
      </Text>
    </Flex>
    <Button onClick={handleDownloadCashiers}>Baixar Caixas</Button>
  </Stack>
);
