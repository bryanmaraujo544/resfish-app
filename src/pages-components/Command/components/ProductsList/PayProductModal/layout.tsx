/* eslint-disable no-unsafe-optional-chaining */
import { Dispatch, SetStateAction, useContext } from 'react';
import {
  Button,
  Stack,
  Text,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Input,
} from '@chakra-ui/react';

import { Modal } from 'components/Modal';
import { Product } from 'types/Product';
import { formatDecimalNum } from 'utils/formatDecimalNum';
import { CommandContext } from 'pages-components/Command';
import { parseToBRL } from 'utils/parseToBRL';

const paymentOptions = [
  'Dinheiro',
  'Cartão de Crédito',
  'Cartão de Débito',
  'Pix',
];

interface Props {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handlePayProduct: (e: any) => void;
  productInfos: Product;
  paymentValue: string;
  setPaymentValue: Dispatch<SetStateAction<string>>;
  amountToPay: number;
  setAmountToPay: Dispatch<SetStateAction<number>>;
  typeOfPayment: 'unit' | 'free';
  setTypeOfPayment: Dispatch<SetStateAction<'unit' | 'free'>>;
  isPaying: boolean;
  paymentType: string;
  setPaymentType: Dispatch<SetStateAction<string>>;
}

export const PayProductModalLayout = ({
  isModalOpen,
  handleCloseModal,
  handlePayProduct,
  productInfos,
  paymentValue,
  setPaymentValue,
  amountToPay,
  setAmountToPay,
  typeOfPayment,
  setTypeOfPayment,
  isPaying,
  paymentType,
  setPaymentType,
}: Props) => {
  const { command } = useContext(CommandContext);
  const totalOfProduct = productInfos.amount * productInfos.unitPrice;

  const tempRestValueToBePayedNum =
    Math.round(
      (totalOfProduct - (productInfos.totalPayed as number) + Number.EPSILON) *
        100
    ) / 100;

  const tempTotalToBePayed =
    Math.round(
      ((command?.total || 0) - (command?.totalPayed || 0) + Number.EPSILON) *
        100
    ) / 100;
  const commandValueToBePayed = tempTotalToBePayed > 0 ? tempTotalToBePayed : 0;

  // If the value to be payed of some product is greater thant the necesary to be payed of command
  // it means the user made a payment of part of command.
  const restValueToBePayedNum =
    tempRestValueToBePayedNum > commandValueToBePayed
      ? commandValueToBePayed
      : tempRestValueToBePayedNum;

  const totalToBePayed = formatDecimalNum({
    num: restValueToBePayedNum.toString(),
    to: 'comma',
  });

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => handleCloseModal()}
      title="Pagar produto"
      size="2xl"
    >
      <Stack gap={4} as="form" onSubmit={(e) => handlePayProduct(e)}>
        <Stack>
          <Flex gap={2}>
            <Text fontSize={[18, 20]} fontWeight={600} flex="1">
              {productInfos?.name}
            </Text>
            <Select
              w="auto"
              cursor="pointer"
              value={typeOfPayment}
              onChange={(e) =>
                setTypeOfPayment(e.target.value as 'unit' | 'free')
              }
            >
              <option value="free">Pagar por valor livre</option>
              <option value="unit">Pagar por unidade</option>
            </Select>
          </Flex>

          {typeOfPayment === 'unit' ? (
            <>
              <Text fontWeight={500}>Quantidade a Pagar</Text>
              <NumberInput
                defaultValue={0}
                min={0}
                max={productInfos?.amount}
                value={amountToPay}
                onChange={(numStr) => setAmountToPay(Number(numStr))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </>
          ) : (
            <>
              <Text fontWeight={500}>Valor a pagar</Text>
              <Input
                placeholder="Valor a pagar"
                type="text"
                max={productInfos?.unitPrice * productInfos?.amount || 0}
                // value=
                onChange={(e) => setPaymentValue(e.target.value)}
              />
            </>
          )}
        </Stack>
        {typeOfPayment === 'unit' && (
          <Text fontWeight={500}>
            Pagar: {parseToBRL(Number(paymentValue) || 0)}
          </Text>
        )}
        <Stack>
          <Text fontWeight={500}>Meio de Pagamento</Text>
          <Select
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            {paymentOptions.map((payment) => (
              <option key={`payment-option-${payment}`}>{payment}</option>
            ))}
          </Select>
        </Stack>
        <Text fontWeight={500}>Total a ser pago: {totalToBePayed}</Text>
        <Button
          type="submit"
          isLoading={isPaying}
          loadingText="Pagando Produto"
        >
          Pagar Produto
        </Button>
      </Stack>
    </Modal>
  );
};
