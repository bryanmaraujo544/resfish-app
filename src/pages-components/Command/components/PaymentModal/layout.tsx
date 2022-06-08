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
import { SubmitHandler } from 'react-hook-form';

interface PaymentInputs {
  receivedValue: string;
  paymentType: string;
}

interface Props {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleMakePayment: SubmitHandler<PaymentInputs>;
  rhfHandleSubmit: any;
  rhfRegister: any;
  rhfErrors: any;
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
  rhfErrors,
  rhfHandleSubmit,
  rhfRegister,
}: Props) => (
  <Modal
    isOpen={isModalOpen}
    onClose={handleCloseModal}
    title="Pagamento"
    size="full"
  >
    <Stack gap={[2, 6]}>
      {/* HEADER */}
      <Flex gap={[1, 2, 3, 4]}>
        <BgBox flex="1">
          <Text fontSize={[14, 18, 20]}>
            Mesa:{' '}
            <Text display="inline-block" fontWeight="700">
              Mônica
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
            <Text display="inline-block" fontWeight="700">
              R$ 289,00
            </Text>
          </Text>
        </BgBox>
        <BgBox flex="1" justifyContent="center">
          <Text fontSize={[14, 18, 20]}>
            Pago:{' '}
            <Text display="inline-block" fontWeight="700">
              R$ 190,00
            </Text>
          </Text>
        </BgBox>
      </Flex>
      <Divider />
      {/* Payment Form */}
      <FormControl
        onSubmit={rhfHandleSubmit(handleMakePayment)}
        as="form"
        display="flex"
        flexDir="column"
        gap={[4, 8]}
      >
        <Grid gridTemplateColumns="1fr 1fr" gap={[2, 4, 8]}>
          <GridItem gridColumn={['1 / 3', '1 / 3', '1 / 2']}>
            <InputGroup hasError={rhfErrors.receivedValue}>
              <TitleText>Valor Recebido</TitleText>
              <Input
                placeholder="Ex: R$ 23,90"
                {...rhfRegister('receivedValue', { required: true })}
              />
            </InputGroup>
          </GridItem>
          <GridItem gridColumn={['1 / 3', '1 / 3', '2 / 3']}>
            <InputGroup hasError={rhfErrors.paymentType}>
              <TitleText
                fontWeight="600"
                fontSize={[16, 18, 22]}
                color="blue.800"
              >
                Método de Pagamento
              </TitleText>
              <Select {...rhfRegister('paymentType', { required: true })}>
                {paymentOptions.map((payment) => (
                  <option key={`payment-option-${payment}`}>{payment}</option>
                ))}
              </Select>
            </InputGroup>
          </GridItem>
        </Grid>
        <BgBox>
          <TitleText fontSize={[18, 22, 26]}>
            Troco:{' '}
            <Text fontWeight="700" display="inline-block" color="red.400">
              R$ 43,90
            </Text>
          </TitleText>
        </BgBox>
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
        Campo obrigatório
      </Text>
    )}
  </Stack>
);

const TitleText = (props: any) => (
  <Text fontWeight="600" fontSize={[16, 18, 22]} color="blue.800" {...props}>
    {props.children}
  </Text>
);
