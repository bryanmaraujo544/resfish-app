/* eslint-disable no-unsafe-optional-chaining */
import { Dispatch, SetStateAction } from 'react';
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
}: Props) => {
  const totalOfProduct = productInfos.amount * productInfos.unitPrice;

  const restValueToBePayedNum =
    Math.round(
      (totalOfProduct - (productInfos.totalPayed as number) + Number.EPSILON) *
        100
    ) / 100;

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
              <Text>Quantidade a Pagar</Text>
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
              <Text>Valor a pagar</Text>
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
          <Text>
            Pagar: R${' '}
            {formatDecimalNum({ num: paymentValue.toString(), to: 'comma' })}
          </Text>
        )}
        <Text>Total a ser pago: {totalToBePayed}</Text>
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
