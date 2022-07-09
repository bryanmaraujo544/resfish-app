import { useToast } from '@chakra-ui/react';
import { CommandContext } from 'pages-components/Command';
import CommandService from 'pages-components/Command/services/CommandService';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { formatDecimalNum } from 'utils/formatDecimalNum';
import { DiscountLayout } from './layout';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const DiscountModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  const [newDiscount, setNewDiscount] = useState('');
  const [percent, setPercent] = useState(0);

  const [isEditing, setIsEditing] = useState(false);

  const { command, setCommand } = useContext(CommandContext);
  const toast = useToast();

  useEffect(() => {
    const discountWithPercent =
      Math.round(
        ((command?.total as number) * (percent / 100) + Number.EPSILON) * 100
      ) / 100;
    setNewDiscount(
      formatDecimalNum({ num: String(discountWithPercent), to: 'comma' })
    );
  }, [percent, command]);

  function handleCloseModal() {
    setIsModalOpen(false);
    setIsEditing(false);

    setNewDiscount('');
    setPercent(0);
  }

  async function handleEditDiscount() {
    try {
      setIsEditing(true);

      if (isEditing) {
        return;
      }

      const discountFormatted = Number(
        formatDecimalNum({
          num: newDiscount,
          to: 'point',
        })
      );

      if (newDiscount === '') {
        toast.closeAll();
        toast({
          status: 'warning',
          title: 'Insira um desconto',
          duration: 1000,
        });
        setIsEditing(false);
        return;
      }

      if (Number.isNaN(discountFormatted)) {
        toast.closeAll();
        toast({
          status: 'error',
          title: 'Valor inválido',
          duration: 1000,
        });
        setIsEditing(false);

        return;
      }

      if (discountFormatted > (command?.total as number)) {
        toast.closeAll();
        toast({
          status: 'error',
          title: 'Desconto maior que o total',
          duration: 1000,
        });
        setIsEditing(false);

        return;
      }

      if (discountFormatted < 0) {
        toast.closeAll();
        toast({
          status: 'error',
          title: 'Desconto inválido',
          duration: 1000,
        });
        setIsEditing(false);
        return;
      }

      const data = await CommandService.updateCommandDiscount({
        _id: command._id as string,
        discount: discountFormatted,
      });

      handleCloseModal();

      setCommand(data.command);
    } catch (err: any) {
      toast.closeAll();
      toast({
        status: 'error',
        title: err?.response?.data?.message,
        duration: 1000,
      });
    }
  }

  const discount = command?.discount;

  return (
    <DiscountLayout
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      discount={discount || 0}
      newDiscount={newDiscount}
      setNewDiscount={setNewDiscount}
      percent={percent}
      setPercent={setPercent}
      handleEditDiscount={handleEditDiscount}
      isEditing={isEditing}
    />
  );
};
