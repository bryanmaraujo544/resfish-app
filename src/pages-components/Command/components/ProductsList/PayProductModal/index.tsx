import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useContext,
} from 'react';
import { useToast } from '@chakra-ui/react';
import { CommandContext } from 'pages-components/Command';
import { Product } from 'types/Product';
import { formatDecimalNum } from 'utils/formatDecimalNum';
import CommandService from 'pages-components/Command/services/CommandService';
import { PayProductModalLayout } from './layout';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  productToPay: Product;
}

export const PayProductModal = ({
  isModalOpen,
  setIsModalOpen,
  productToPay,
}: Props) => {
  const [paymentValue, setPaymentValue] = useState('0');
  const [amountToPay, setAmountToPay] = useState(0);
  const [typeOfPayment, setTypeOfPayment] = useState<'unit' | 'free'>('unit');

  const toast = useToast();
  const { productsDispatch, products, command, setCommand } =
    useContext(CommandContext);

  console.log({ products });

  useEffect(() => {
    const paymentTotal = amountToPay * productToPay.unitPrice;
    setPaymentValue(paymentTotal.toString());
  }, [amountToPay]);

  useEffect(() => {
    setPaymentValue('0');
  }, [typeOfPayment]);

  function handleCloseModal() {
    setIsModalOpen(false);
    setPaymentValue('0');
  }

  async function handlePayProduct() {
    try {
      // Converting one number with comma to valid number with point 32,90 ==> 32.90
      const paymentValueFormatted = Number(
        formatDecimalNum({
          num: paymentValue.toString(),
          to: 'point',
        })
      );

      if (Number.isNaN(paymentValueFormatted)) {
        toast.closeAll();
        toast({
          status: 'error',
          title: 'Valor inválido',
        });
        return;
      }

      const totalOfProduct = productToPay.amount * productToPay.unitPrice;

      const restValueToBePayed =
        Math.round(
          (totalOfProduct -
            (productToPay.totalPayed as number) +
            Number.EPSILON) *
            100
        ) / 100;

      console.log({ restValueToBePayed, paymentValueFormatted });

      if (paymentValueFormatted > restValueToBePayed) {
        toast.closeAll();
        toast({
          status: 'warning',
          title: 'Pagamento maior do que o necessário',
          duration: 3000,
        });
        return;
      }

      // UPDATE the totalPayed propertie of the product;

      const oldProducts = command?.products;
      const newProducts = oldProducts?.map((product) => {
        if (product._id === productToPay._id) {
          return {
            ...product,
            totalPayed: (
              (product?.totalPayed as number) + paymentValueFormatted
            ).toFixed(2) as any,
          };
        }
        return product;
      });
      const { command: updatedCommand } = await CommandService.updateCommand({
        _id: command?._id as string,
        products: newProducts,
      });
      console.log({ updatedCommand });
      setCommand(updatedCommand);

      productsDispatch({
        type: 'update-product-total-payed',
        payload: {
          product: { id: productToPay._id, totalPayed: paymentValueFormatted },
        },
      });

      toast.closeAll();
      toast({
        status: 'success',
        title: 'Pago!',
        duration: 2000,
      });
    } catch (error: any) {
      toast({
        status: 'error',
        title: error?.response?.data?.message,
      });
    }
  }

  return (
    <PayProductModalLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      handlePayProduct={handlePayProduct}
      productInfos={productToPay}
      paymentValue={paymentValue}
      setPaymentValue={setPaymentValue}
      amountToPay={amountToPay}
      setAmountToPay={setAmountToPay}
      typeOfPayment={typeOfPayment}
      setTypeOfPayment={setTypeOfPayment}
    />
  );
};
