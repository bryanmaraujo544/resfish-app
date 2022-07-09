/* eslint-disable react/destructuring-assignment */
import {
  Box,
  Divider,
  Flex,
  Stack,
  Text,
  Grid,
  Heading,
  Spinner,
  Input,
} from '@chakra-ui/react';
import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import { DateTime } from 'luxon';
import { Dispatch, SetStateAction } from 'react';
// eslint-disable-next-line import/named
import { Cashier, CashierPayment } from 'types/Cashier';
import { formatDecimalNum } from 'utils/formatDecimalNum';
import { formatPaymentTypes } from 'utils/formatPaymentTypes';
import { parseToBRL } from 'utils/parseToBRL';

interface Props {
  cashier: Cashier;
  handleBackPage: () => void;
  isLoading: boolean;
  payments: CashierPayment[];
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const CashierLayout = ({
  cashier,
  handleBackPage,
  isLoading,
  payments,
  search,
  setSearch,
}: Props) => {
  const dt = DateTime.fromISO(cashier?.date, {
    zone: 'pt-BR',
    setZone: true,
  }).setLocale('pt-BR');

  return (
    <Layout>
      <Header hasBackPageBtn handleBackPage={handleBackPage} />
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Flex
            justify={['center', 'center', 'space-between']}
            flexWrap="wrap"
            gap={4}
            align="center"
          >
            <Heading fontSize={[18, 22, 26]} color="blue.800" fontWeight={600}>
              Caixa do dia:{' '}
              <BoldText>{dt.toLocaleString(DateTime.DATE_FULL)}</BoldText>
            </Heading>
            <Box bg="blue.400" p={1} px={[2, 4]} rounded={4}>
              <Text fontSize={[20, 22]} color="blue.50">
                Total:{' '}
                <BoldText color="blue.50">
                  {parseToBRL(cashier?.total || 0)}
                </BoldText>
              </Text>
            </Box>
          </Flex>
          <Input
            placeholder="Pesquise por um pagamento..."
            mt={[4, 6]}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Stack gap={[4, 8]} mt={[6, 12]}>
            {payments?.map(
              ({ _id, totalPayed, paymentTypes, command, waiterExtra }) => (
                <Flex
                  key={`home-payments-${_id}`}
                  bg="blue.50"
                  p={[2, 4]}
                  rounded={4}
                  border="1px solid"
                  borderColor="gray.200"
                  color="blue.800"
                  justify="center"
                  align="flex-start"
                  flexDirection="column"
                  fontWeight={400}
                  fontSize={[14, 16, 18]}
                >
                  <Grid
                    gridTemplateColumns={['1fr', '1fr 1fr']}
                    w="100%"
                    gap={[2, 4]}
                  >
                    <TextWhiteBox>
                      <Text>
                        Mesa: <BoldText>{command?.table}</BoldText>
                      </Text>
                    </TextWhiteBox>
                    <TextWhiteBox>
                      <Text>
                        Total:{' '}
                        <BoldText>{parseToBRL(totalPayed || 0)}</BoldText>
                      </Text>
                    </TextWhiteBox>
                    <TextWhiteBox>
                      <Text>
                        Caixinha {command?.waiter}:{' '}
                        <BoldText>{parseToBRL(waiterExtra || 0)}</BoldText>
                      </Text>
                    </TextWhiteBox>
                    <TextWhiteBox>
                      <Text>
                        Meio de Pagamento:{' '}
                        <BoldText>{formatPaymentTypes(paymentTypes)}</BoldText>
                      </Text>
                    </TextWhiteBox>
                  </Grid>
                  <Divider my={[3, 6]} bg="gray.200" />
                  <Grid
                    gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']}
                    w="100%"
                    gap={[2, 4]}
                    fontSize={[14, 16]}
                    color="blue.600"
                    fontWeight={600}
                    boxShadow="sm"
                  >
                    {command?.products?.map(
                      ({ _id: productId, name, amount }) => (
                        <Box
                          key={`cashier-pay-${_id}-${productId}`}
                          bg="white"
                          p={2}
                          rounded={4}
                          textAlign="center"
                        >
                          <Text color="blue.600">
                            {name} - {amount}
                          </Text>
                        </Box>
                      )
                    )}
                  </Grid>
                </Flex>
              )
            )}
          </Stack>
        </>
      )}
    </Layout>
  );
};

const BoldText = (props: any) => (
  <Box as="span" color="blue.600" fontWeight={700} {...props}>
    {props.children}
  </Box>
);

const TextWhiteBox = (props: any) => (
  <Box
    p={2}
    bg="white"
    textAlign="center"
    border="1px solid"
    borderColor="gray.200"
    rounded={4}
    color="blue.800"
    fontWeight={600}
  >
    {props.children}
  </Box>
);
