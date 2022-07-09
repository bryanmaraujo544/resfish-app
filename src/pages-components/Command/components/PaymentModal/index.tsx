import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { CommandContext } from 'pages-components/Command';
import { formatDecimalNum } from 'utils/formatDecimalNum';
import { Button, Flex, useToast } from '@chakra-ui/react';
// import PaymentsService from 'pages-components/Command/services/PaymentsService';
import CommandService from 'pages-components/Command/services/CommandService';
import { Modal } from 'components/Modal';
import { PaymentModalLayout } from './layout';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsCloseCommandModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const PaymentModal = ({
  isModalOpen,
  setIsModalOpen,
  setIsCloseCommandModalOpen,
}: Props) => {
  const { command, setCommand } = useContext(CommandContext);
  const [isPaying, setIsPaying] = useState(false);
  const [receivedValue, setReceivedValue] = useState('');
  const [exchange, setExchange] = useState('0');
  const [isReceivedValueInvalid, setIsReceivedValueInvalid] = useState({
    value: false,
    message: '',
  });
  const [paymentType, setPaymentType] = useState('Dinheiro');
  const [isConfirmCloseCommandModalOpen, setIsConfirmCloseCommandModalOpen] =
    useState(false);

  const toast = useToast();

  const tempTotalToBePayed =
    Math.round(
      ((command?.total || 0) -
        (command?.totalPayed || 0) -
        (command?.discount || 0) +
        Number.EPSILON) *
        100
    ) / 100;
  const totalToBePayed = tempTotalToBePayed > 0 ? tempTotalToBePayed : 0;

  useEffect(() => {
    const receivedValueFormatted = Number(
      formatDecimalNum({ num: receivedValue, to: 'point' })
    );

    if (Number.isNaN(receivedValueFormatted)) {
      setIsReceivedValueInvalid({ value: true, message: 'Valor inválido.' });
      setExchange('');
      return;
    }

    if (receivedValue === '') {
      setExchange('0');
    }

    if (receivedValueFormatted < 0) {
      setIsReceivedValueInvalid({ value: true, message: 'Valor inválido.' });
    }

    if (receivedValueFormatted > totalToBePayed && paymentType === 'Dinheiro') {
      setIsReceivedValueInvalid({ value: false, message: '' });
      const updatedExchange = (receivedValueFormatted - totalToBePayed).toFixed(
        2
      );
      setExchange(
        // formatDecimalNum({
        //   num: updatedExchange.toString(),
        //   to: 'comma',
        // })
        updatedExchange
      );
    }

    if (paymentType !== 'Dinheiro' && receivedValueFormatted > totalToBePayed) {
      setIsReceivedValueInvalid({
        value: true,
        message: 'Pagamento maior do que o necessário',
      });
    } else {
      setIsReceivedValueInvalid({ value: false, message: '' });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivedValue]);

  function handleCloseModal() {
    setIsModalOpen(false);
    setIsReceivedValueInvalid({ value: false, message: '' });
    setIsPaying(false);
    setReceivedValue('');
    setExchange('0');
  }

  const handleMakePayment = async (e: any) => {
    try {
      e.preventDefault();

      if (isPaying) {
        return;
      }

      setIsPaying(true);
      if (totalToBePayed === 0) {
        toast({
          status: 'info',
          title: 'Não há nada a se pagar',
          duration: 1000,
        });

        setIsPaying(false);
        return;
      }

      if (!receivedValue) {
        setIsPaying(false);
        toast.closeAll();
        toast({
          status: 'warning',
          title: 'Insira o valor recebido do cliente',
          duration: 2000,
        });
        return;
      }

      if (isReceivedValueInvalid.value === true) {
        setIsPaying(false);
        toast.closeAll();
        toast({
          status: 'warning',
          title: 'Valor recebido inválido!',
          duration: 1000,
        });
        return;
      }

      const receivedValueFormatted = Number(
        formatDecimalNum({ num: receivedValue, to: 'point' })
      );

      if (receivedValueFormatted < 0) {
        setIsPaying(false);
        toast.closeAll();
        toast({
          status: 'error',
          title: 'Valor menor que 0',
          duration: 1000,
        });
        return;
      }

      const totalToPay =
        receivedValueFormatted > totalToBePayed
          ? totalToBePayed
          : receivedValueFormatted;

      const { message, command: updatedCommand } =
        await CommandService.updateCommand({
          _id: command._id,
          updateTotal: 'true',
          total: totalToPay,
          paymentType,
        });

      setCommand(updatedCommand);

      if (
        updatedCommand.total ===
        updatedCommand.totalPayed + updatedCommand.discount
      ) {
        // Ask if the user wants to close the cashier

        setIsConfirmCloseCommandModalOpen(true);
        // setIsCloseCommandModalOpen;
      }

      toast({
        status: 'success',
        title: message,
        isClosable: true,
        duration: 3000,
      });

      handleCloseModal();
    } catch (error: any) {
      setIsPaying(false);
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

  function handleCloseConfirmModal() {
    setIsConfirmCloseCommandModalOpen(false);
  }

  function handleOpenCloseCommandModal() {
    handleCloseConfirmModal();
    setIsCloseCommandModalOpen(true);
  }

  return (
    <>
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
        isPaying={isPaying}
      />
      <Modal
        isOpen={isConfirmCloseCommandModalOpen}
        onClose={handleCloseConfirmModal}
        title="Deseja fechar a comanda?"
      >
        <Flex gap={4}>
          <Button flex="1" onClick={handleCloseConfirmModal}>
            Cancelar
          </Button>
          <Button
            flex="1"
            colorScheme="blue"
            onClick={handleOpenCloseCommandModal}
          >
            Confirmar
          </Button>
        </Flex>
      </Modal>
    </>
  );
};
