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
import { PaymentModalLayout } from './layout';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const PaymentModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  const { command } = useContext(CommandContext);
  const [receivedValue, setReceivedValue] = useState('');
  const [exchange, setExchange] = useState('0');
  const [isReceivedValueInvalid, setIsReceivedValueInvalid] = useState({
    value: false,
    message: '',
  });
  const [paymentType, setPaymentType] = useState('Dinheiro');

  const toast = useToast();

  useEffect(() => {
    const receivedValueFormatted = Number(
      formatDecimalNum({ num: receivedValue, to: 'point' })
    );

    if (Number.isNaN(receivedValueFormatted)) {
      setIsReceivedValueInvalid({ value: true, message: 'Valor inválido.' });
      setExchange('');
      return;
    }

    const totalToBePayed = (command?.total || 0) - (command?.totalPayed || 0);

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
  }

  const handleMakePayment = async (e: any) => {
    e.preventDefault();

    if (!receivedValue) {
      toast({
        status: 'error',
        title: 'Insira o valor recebido do cliente',
      });
      return;
    }
    console.log({ receivedValue, paymentType });
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
