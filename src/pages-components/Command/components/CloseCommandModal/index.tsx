import { useToast } from '@chakra-ui/react';
import { CommandContext } from 'pages-components/Command';
import PaymentsService from 'pages-components/Command/services/PaymentsService';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import { formatDecimalNum } from 'utils/formatDecimalNum';
import { CloseCommandModalLayout } from './layout';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const CloseCommandModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  const [waiterExtra, setWaiterExtra] = useState('');
  const [waiterExtraPercent, setWaiterExtraPercent] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const observation = useRef('');

  const { command, setCommand } = useContext(CommandContext);
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
    const percentageValue =
      Math.round(
        ((command?.total as number) * (waiterExtraPercent / 100) +
          Number.EPSILON) *
          100
      ) / 100;
    setWaiterExtra(
      formatDecimalNum({
        num: Number.isNaN(percentageValue) ? '0' : percentageValue.toString(),
        to: 'comma',
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waiterExtraPercent]);

  function handleCloseModal() {
    setIsModalOpen(false);
    setIsClosing(false);
  }

  async function handleCloseCommand() {
    try {
      if (isClosing) {
        return;
      }
      setIsClosing(true);

      if (totalToBePayed > 0) {
        toast.closeAll();
        toast({
          status: 'warning',
          title: 'Comanda ainda não foi paga!',
          duration: 2000,
        });
        setIsClosing(false);
        return;
      }

      const waiterExtraFormatted = Number(
        formatDecimalNum({ num: waiterExtra, to: 'point' })
      );

      if (Number.isNaN(waiterExtraFormatted) || waiterExtraFormatted < 0) {
        toast({
          status: 'error',
          title: 'Valor da caixinha inválido.',
          duration: 1000,
          isClosable: true,
        });
        setIsClosing(false);
        return;
      }

      const { paymentInfos } = await PaymentsService.pay({
        commandId: command?._id as string,
        paymentTypes: command?.paymentTypes as string[],
        waiterExtra: waiterExtraFormatted,
        observation: observation.current,
        discount: command?.discount || 0,
      });

      toast.closeAll();
      toast({
        status: 'success',
        title: 'Comanda fechada!',
        duration: 2000,
      });
      handleCloseModal();

      setCommand(paymentInfos.command);
    } catch (err: any) {
      setIsClosing(false);
      toast.closeAll();
      toast({
        status: 'error',
        title: err?.response?.data?.message,
        duration: 1000,
      });
    }
  }

  return (
    <CloseCommandModalLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      waiterExtra={waiterExtra}
      setWaiterExtra={setWaiterExtra}
      waiterExtraPercent={waiterExtraPercent}
      setWaiterExtraPercent={setWaiterExtraPercent}
      command={command}
      observation={observation}
      handleCloseCommand={handleCloseCommand}
    />
  );
};
