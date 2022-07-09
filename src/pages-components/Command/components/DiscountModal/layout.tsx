/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { Input, Stack, Text, Button, Flex, Select } from '@chakra-ui/react';
import { Modal } from 'components/Modal';
import { Dispatch, SetStateAction } from 'react';
import { parseToBRL } from 'utils/parseToBRL';

interface Props {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  discount: number;
  newDiscount: string;
  setNewDiscount: Dispatch<SetStateAction<string>>;
  percent: number;
  setPercent: Dispatch<SetStateAction<number>>;
  handleEditDiscount: () => void;
  isEditing: boolean;
}

export const DiscountLayout = ({
  handleCloseModal,
  isModalOpen,
  discount,
  newDiscount,
  setNewDiscount,
  handleEditDiscount,
  isEditing,
  percent,
  setPercent,
}: Props) => (
  <Modal
    isOpen={isModalOpen}
    onClose={handleCloseModal}
    title="Desconto da comanda"
  >
    <Stack gap={[2, 4]}>
      <Text fontSize={[16, 18, 20]} fontWeight={600} color="blue.800">
        Desconto da comanda: {parseToBRL(discount || 0)}
      </Text>
      <Stack>
        <Flex gap={[2]}>
          <Input
            value={newDiscount}
            flex="2"
            placeholder="Novo valor de desconto"
            onChange={(e) => {
              setNewDiscount(e.target.value);
            }}
          />
          <Select
            flex="1"
            value={percent}
            onChange={(e) => setPercent(Number(e.target.value))}
          >
            <option value={0}>0%</option>
            <option value={5}>5%</option>
            <option value={10}>10%</option>
            <option value={20}>20%</option>
            <option value={50}>50%</option>
          </Select>
        </Flex>

        <Button
          onClick={() => handleEditDiscount()}
          isLoading={isEditing}
          loadingText="Atualizando desconto"
        >
          Editar Desconto
        </Button>
      </Stack>
    </Stack>
  </Modal>
);
