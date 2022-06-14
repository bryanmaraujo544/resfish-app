import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { CommandContext } from 'pages-components/Command';
import { formatDecimalNum } from 'utils/formatDecimalNum';
import { useToast } from '@chakra-ui/react';
import PaymentsService from 'pages-components/Command/services/PaymentsService';
import { PaymentModalLayout } from './layout';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const PaymentModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  const { command, setCommand } = useContext(CommandContext);
  const [receivedValue, setReceivedValue] = useState('');
  const [exchange, setExchange] = useState('0');
  const [isReceivedValueInvalid, setIsReceivedValueInvalid] = useState({
    value: false,
    message: '',
  });
  const [paymentType, setPaymentType] = useState('Dinheiro');

  const toast = useToast();

  const totalToBePayed =
    Math.round(
      ((command?.total || 0) - (command?.totalPayed || 0) + Number.EPSILON) *
        100
    ) / 100;

  useEffect(() => {
    const receivedValueFormatted = Number(
      formatDecimalNum({ num: receivedValue, to: 'point' })
    );

    if (Number.isNaN(receivedValueFormatted)) {
      setIsReceivedValueInvalid({ value: true, message: 'Valor inválido.' });
      setExchange('');
      return;
    }

    if (receivedValueFormatted < totalToBePayed) {
      setIsReceivedValueInvalid({
        value: true,
        message: 'Valor menor que o necessário.',
      });
      setExchange('');
      return;
    }

    setIsReceivedValueInvalid({ value: false, message: '' });
    const updatedExchange = (receivedValueFormatted - totalToBePayed).toFixed(
      2
    );
    setExchange(
      formatDecimalNum({
        num: updatedExchange.toString(),
        to: 'comma',
      })
    );
  }, [receivedValue]);

  function handleCloseModal() {
    setIsModalOpen(false);
    setIsReceivedValueInvalid({ value: false, message: '' });
  }

  const handleMakePayment = async (e: any) => {
    try {
      e.preventDefault();

      if (paymentType === 'Dinheiro' && !receivedValue) {
        toast.closeAll();
        toast({
          status: 'info',
          title: 'Insira o valor recebido do cliente',
          duration: 2000,
        });
        return;
      }

      if (totalToBePayed === 0) {
        toast({
          status: 'info',
          title: 'Esta comanda já foi paga!',
        });
        return;
      }

      if (isReceivedValueInvalid.value === true) {
        toast({
          status: 'warning',
          title: 'Valor recebido inválido!',
          duration: 1000,
        });
        return;
      }
      const { message, paymentInfos } = await PaymentsService.pay({
        commandId: command?._id as string,
        paymentType,
      });
      setCommand(paymentInfos.command);

      toast({
        status: 'success',
        title: message,
        isClosable: true,
        duration: 3000,
      });

      handleCloseModal();
    } catch (error: any) {
      toast.closeAll();
      toast({
        status: 'error',
        title:
          error?.response?.data?.message ||
          'Erro no servidor. Recarregue a página.',
        duration: 2000,
      });
    }
  };

  return (
    <PaymentModalLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      handleMakePayment={handleMakePayment}
      command={command}
      exchange={exchange}
      paymentType={paymentType}
      setPaymentType={setPaymentType}
      receivedValue={receivedValue}
      setReceivedValue={setReceivedValue}
      isReceivedValueInvalid={isReceivedValueInvalid}
      totalToBePayed={totalToBePayed}
    />
  );
};
