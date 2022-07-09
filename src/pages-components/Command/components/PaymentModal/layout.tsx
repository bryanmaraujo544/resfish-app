/* eslint-disable react/destructuring-assignment */
import {
  Button,
  Divider,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Modal } from 'components/Modal';
import { Dispatch, SetStateAction } from 'react';
import { Command } from 'types/Command';
import { parseToBRL } from 'utils/parseToBRL';

interface Props {
  isModalOpen: boolean;
  command: Command;
  handleCloseModal: () => void;
  handleMakePayment: (e: any) => void;
  exchange: string;
  paymentType: string;
  setPaymentType: Dispatch<SetStateAction<string>>;
  receivedValue: string;
  setReceivedValue: Dispatch<SetStateAction<string>>;
  isReceivedValueInvalid: { value: boolean; message: string };
  totalToBePayed: number;
  isPaying: boolean;
}

const paymentOptions = [
  'Dinheiro',
  'Cartão de Crédito',
  'Cartão de Débito',
  'Pix',
];

export const PaymentModalLayout = ({
  isModalOpen,
  handleCloseModal,
  handleMakePayment,
  command,
  exchange,
  paymentType,
  setPaymentType,
  receivedValue,
  setReceivedValue,
  isReceivedValueInvalid,
  totalToBePayed,
  isPaying,
}: Props) => (
  <Modal
    isOpen={isModalOpen}
    onClose={handleCloseModal}
    title="Pagamento"
    size="full"
  >
    <Stack gap={[2, 6]} alignItems="space-between">
      {/* HEADER */}
      <Grid
        gridTemplateColumns={[
          'repeact(2, 1fr)',
          'repeact(2, 1fr)',
          'repeat(4, 1fr)',
        ]}
        gap={[1, 2, 3, 4]}
      >
        <BgBox flex="1">
          <Text fontSize={[14, 18, 20]}>
            Mesa:{' '}
            <Text as="span" fontWeight="700">
              {command?.table}
            </Text>
          </Text>
        </BgBox>
        <BgBox
          flex="1"
          justifyContent="center"
          border="2px solid"
          borderColor="blue.300"
        >
          <Text fontSize={[14, 18, 20]}>
            Total:{' '}
            <Text as="span" fontWeight="700">
              {parseToBRL(command?.total || 0)}
            </Text>
          </Text>
        </BgBox>
        <BgBox flex="1" justifyContent="center">
          <Text fontSize={[14, 18, 20]}>
            Pago:{' '}
            <Text as="span" fontWeight="700">
              {parseToBRL(command?.totalPayed || 0)}
            </Text>
          </Text>
        </BgBox>
        <BgBox flex="1" border="2px solid" borderColor="red.300">
          <Text fontSize={[14, 18, 20]}>
            A pagar:{' '}
            <Text as="span" fontWeight="700">
              {parseToBRL(totalToBePayed || 0)}
            </Text>
          </Text>
        </BgBox>
      </Grid>
      <Divider />
      {/* Payment Form */}
      <FormControl
        onSubmit={(e) => handleMakePayment(e)}
        as="form"
        display="flex"
        flexDir="column"
        gap={[4, 8]}
      >
        <Grid gridTemplateColumns="1fr 1fr" gap={[2, 4, 8]}>
          {/* {paymentType === 'Dinheiro' && ( */}
          <GridItem gridColumn={['1 / 3', '1 / 3', '1 / 2']}>
            <InputGroup
              hasError={isReceivedValueInvalid.value}
              errorMsg={isReceivedValueInvalid.message}
            >
              <TitleText>Valor Recebido</TitleText>
              <Input
                placeholder="Ex: R$ 23,90"
                value={receivedValue}
                onChange={(e) => setReceivedValue(e.target.value)}
              />
            </InputGroup>
          </GridItem>
          {/* )} */}
          <GridItem gridColumn={['1 / 3', '1 / 3', '2 / 3']}>
            <InputGroup>
              <TitleText
                fontWeight="600"
                fontSize={[16, 18, 22]}
                color="blue.800"
              >
                Método de Pagamento
              </TitleText>
              <Select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
              >
                {paymentOptions.map((payment) => (
                  <option key={`payment-option-${payment}`}>{payment}</option>
                ))}
              </Select>
            </InputGroup>
          </GridItem>
        </Grid>
        {paymentType === 'Dinheiro' && exchange && (
          <BgBox>
            <TitleText fontSize={[18, 22, 26]}>
              Troco:{' '}
              <Text
                as="span"
                fontWeight="700"
                display="inline-block"
                color="red.400"
              >
                {parseToBRL(Number(exchange) || 0)}
              </Text>
            </TitleText>
          </BgBox>
        )}

        <Divider />
        {/* ACTION BUTTONS */}
        <Grid gridTemplateColumns="1fr 1fr" gap={[1, 2, 4]}>
          <GridItem gridColumn={['1 / 3', '1 / 3', '1 / 2']}>
            <Button
              onClick={() => handleCloseModal()}
              w="100%"
              fontSize={[16, 18, 22]}
              py={2}
              h={14}
              color="blue.900"
            >
              Cancelar
            </Button>
          </GridItem>
          <GridItem gridColumn={['1 / 3', '1 / 3', '2 / 3']}>
            <Button
              type="submit"
              w="100%"
              bg="green.300"
              color="white"
              fontSize={[16, 18, 22]}
              py={2}
              h={14}
              _hover={{
                bg: 'green.100',
                color: 'green.700',
              }}
              isLoading={isPaying}
              loadingText="Pagando"
            >
              Confirmar Pagamento
            </Button>
          </GridItem>
        </Grid>
      </FormControl>
    </Stack>
  </Modal>
);

const BgBox = (props: any) => (
  <Flex
    align="center"
    boxShadow="sm"
    bg="blue.50"
    color="blue.700"
    px={4}
    py={2}
    rounded={4}
    justifyContent="center"
    {...props}
  >
    {/* eslint-disable-next-line react/destructuring-assignment */}
    {props.children}
  </Flex>
);

const InputGroup = (props: any) => (
  <Stack {...props}>
    {props.children}
    {props.hasError && (
      <Text fontSize={[12, 14]} color="red.400">
        {props.errorMsg || 'Campo obrigatório'}
      </Text>
    )}
  </Stack>
);

const TitleText = (props: any) => (
  <Text fontWeight="600" fontSize={[16, 18, 22]} color="blue.800" {...props}>
    {props.children}
  </Text>
);
