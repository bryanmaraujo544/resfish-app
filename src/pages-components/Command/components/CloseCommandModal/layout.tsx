/* eslint-disable no-param-reassign */
import { Dispatch, SetStateAction } from 'react';
import { Modal } from 'components/Modal';
import {
  Flex,
  Text,
  Select,
  Input,
  Stack,
  Button,
  Grid,
} from '@chakra-ui/react';
import { Command } from 'types/Command';

interface Props {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  waiterExtra: string;
  setWaiterExtra: Dispatch<SetStateAction<string>>;
  waiterExtraPercent: number;
  setWaiterExtraPercent: Dispatch<SetStateAction<number>>;
  command: Command;
  observation: { current: string };
  handleCloseCommand: () => void;
}

export const CloseCommandModalLayout = ({
  isModalOpen,
  handleCloseModal,
  waiterExtra,
  setWaiterExtra,
  waiterExtraPercent,
  setWaiterExtraPercent,
  command,
  observation,
  handleCloseCommand,
}: Props) => (
  <Modal
    isOpen={isModalOpen}
    onClose={handleCloseModal}
    title="Fechar Comanda"
    size="6xl"
  >
    <Stack gap={6}>
      <Grid gridTemplateColumns={['1fr', '1fr 1fr 1fr']} gap={4}>
        <BgBox>
          <Text fontSize={[14, 16, 18]}>
            Mesa: <TitleText as="span">{command?.table}</TitleText>
          </Text>
        </BgBox>
        <BgBox>
          <Text fontSize={[14, 16, 18]}>
            Total: <TitleText as="span">{command?.total}</TitleText>
          </Text>
        </BgBox>
        <BgBox>
          <Text fontSize={[14, 16, 18]}>
            Total Pago: <TitleText as="span">{command?.totalPayed}</TitleText>
          </Text>
        </BgBox>
      </Grid>
      <Stack>
        <Text>
          Caixinha do garçom:{' '}
          <TitleText as="span" fontSize={[12, 14, 18]}>
            {command?.waiter}
          </TitleText>
        </Text>
        <Flex gap={[2, 4, 6]} alignItems="center">
          <Input
            value={waiterExtra}
            onChange={(e) => setWaiterExtra(e.target.value)}
            w="auto"
            placeholder="Ex: R$ 23,90"
            flex="1"
          />
          <Select
            value={waiterExtraPercent}
            onChange={(e) => setWaiterExtraPercent(Number(e.target.value))}
            w="auto"
            flex="1"
          >
            <option value={0}>0%</option>
            <option value={5}>5%</option>
            <option value={10}>10%</option>
          </Select>
        </Flex>
      </Stack>
      <Stack>
        <Text>Observações</Text>
        <Input
          placeholder="Ex: Deixou para pagar 50 reais depois"
          onChange={(e) => {
            observation.current = e.target.value;
          }}
        />
      </Stack>
      <Flex gap={4}>
        <Button flex="1">Cancelar</Button>
        <Button
          onClick={() => handleCloseCommand()}
          flex="1"
          colorScheme="blue"
        >
          Fechar Comanda
        </Button>
      </Flex>
    </Stack>
  </Modal>
);

const BgBox = (props: any) => (
  <Flex
    align="center"
    boxShadow="sm"
    bg="blue.50"
    color="blue.700"
    px={4}
    py={2}
    rounded={4}
    justifyContent="center"
    {...props}
  >
    {/* eslint-disable-next-line react/destructuring-assignment */}
    {props.children}
  </Flex>
);

const TitleText = (props: any) => (
  <Text fontWeight="600" fontSize={[16, 18, 22]} color="blue.800" {...props}>
    {/* eslint-disable-next-line react/destructuring-assignment */}
    {props.children}
  </Text>
);
