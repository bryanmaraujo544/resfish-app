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
  const totalToBePayed = (command?.total || 0) - (command?.totalPayed || 0);

  console.log({ command });

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
    const updatedExchange = receivedValueFormatted - totalToBePayed;
    setExchange(
      formatDecimalNum({ num: updatedExchange.toString(), to: 'comma' })
    );
  }, [receivedValue]);

  function handleCloseModal() {
    setIsModalOpen(false);
    setIsReceivedValueInvalid({ value: false, message: '' });
  }

  const handleMakePayment = async (e: any) => {
    try {
      e.preventDefault();

      if (!receivedValue) {
        toast({
          status: 'error',
          title: 'Insira o valor recebido do cliente',
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
      const { message, paymentInfos } = await PaymentsService.pay({
        commandId: command?._id as string,
        paymentType,
      });
      setCommand(paymentInfos.command);

      toast({
        status: 'success',
        title: message,
        isClosable: true,
        duration: 4000,
      });

      handleCloseModal();

      console.log({ message, paymentInfos });
    } catch (error: any) {
      toast({
        status: 'error',
        title:
          error?.response?.data?.message ||
          'Erro no servidor. Recarregue a página.',
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
    />
  );
};
