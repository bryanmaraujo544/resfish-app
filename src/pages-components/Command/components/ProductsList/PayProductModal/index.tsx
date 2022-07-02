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
  const [typeOfPayment, setTypeOfPayment] = useState<'unit' | 'free'>('free');
  const [paymentType, setPaymentType] = useState('Dinheiro');

  const [isPaying, setIsPaying] = useState(false);

  const toast = useToast();
  const { command, setCommand } = useContext(CommandContext);

  useEffect(() => {
    const paymentTotal = (Math.round(
      (amountToPay * (productToPay?.unitPrice as number) + Number.EPSILON) * 100
    ) / 100) as number;
    setPaymentValue(paymentTotal.toString());
  }, [amountToPay, productToPay.unitPrice]);

  useEffect(() => {
    setPaymentValue('0');
  }, [typeOfPayment]);

  function handleCloseModal() {
    setIsModalOpen(false);
    setPaymentValue('0');
    setAmountToPay(0);
    setTypeOfPayment('free');
    setIsPaying(false);
    setPaymentType('Dinheiro');
  }

  async function handlePayProduct(e: any) {
    e.preventDefault();
    try {
      if (isPaying) {
        return;
      }
      setIsPaying(true);
      // Converting one number with comma to valid number with point 32,90 ==> 32.90
      const paymentValueFormatted = Number(
        formatDecimalNum({
          num: paymentValue.toString(),
          to: 'point',
        })
      );

      if (paymentValueFormatted <= 0) {
        setIsPaying(false);
        toast.closeAll();
        toast({
          status: 'warning',
          title: 'Valor de pagamento menor ou igual a 0',
          duration: 2000,
          isClosable: true,
        });
        return;
      }

      if (Number.isNaN(paymentValueFormatted)) {
        setIsPaying(false);
        toast.closeAll();
        toast({
          status: 'error',
          title: 'Valor inválido',
          duration: 2000,
          isClosable: true,
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

      if (paymentValueFormatted > restValueToBePayed) {
        setIsPaying(false);
        toast.closeAll();
        toast({
          status: 'warning',
          title: 'Pagamento maior do que o necessário',
          duration: 2000,
        });
        return;
      }

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
        total: paymentValueFormatted,
        updateTotal: 'true',
        paymentType,
      });
      setCommand(updatedCommand);

      // productsDispatch({
      //   type: 'update-product-total-payed',
      //   payload: {
      //     product: { id: productToPay._id, totalPayed: paymentValueFormatted },
      //   },
      // });

      handleCloseModal();
      toast.closeAll();
      toast({
        status: 'success',
        title: 'Pago!',
        duration: 2000,
      });
    } catch (error: any) {
      setIsPaying(false);
      toast.closeAll();
      toast({
        status: 'error',
        title: error?.response?.data?.message,
        duration: 2000,
        isClosable: true,
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
      isPaying={isPaying}
      paymentType={paymentType}
      setPaymentType={setPaymentType}
    />
  );
};
