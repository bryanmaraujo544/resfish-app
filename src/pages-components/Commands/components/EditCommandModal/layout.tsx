import {
  FormControl,
  Input,
  Select,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react';
import { Modal } from 'components/Modal';
import { SubmitHandler } from 'react-hook-form';
interface EditCommandInputs {
  table: string;
  waiter: string;
  fishingType: string;
}

interface Props {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleEditCommand: SubmitHandler<EditCommandInputs>;
  rhfRegister: any;
  rhfErrors: any;
  rhfHandleSubmit: any;
}

export const EditCommandModalLayout = ({
  isModalOpen,
  handleCloseModal,
  handleEditCommand,
  rhfHandleSubmit,
  rhfRegister,
  rhfErrors,
}: Props) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title="Editar comanda"
    >
      <FormControl
        as="form"
        display="flex"
        flexDirection="column"
        gap={4}
        onSubmit={rhfHandleSubmit(handleEditCommand)}
      >
        <InputGroup>
          <Text>Mesa: </Text>
          <Input
            placeholder="João"
            {...rhfRegister('table', { required: true })}
          />
          <ErrorText
            hasError={rhfErrors.table}
            errorMsg="Esse campo é necessário"
          />
        </InputGroup>
        <InputGroup>
          <Text>Garçom: </Text>
          <Input
            placeholder="Fulano..."
            {...rhfRegister('waiter', { required: true })}
          />
          <ErrorText
            hasError={rhfErrors.waiter}
            errorMsg="Esse campo é necessário"
          />
        </InputGroup>
        <InputGroup>
          <Text>Tipo de Pesca</Text>
          <Select {...rhfRegister('fishingType')} cursor="pointer">
            <option>Nenhum</option>
            <option>Pesca Esportiva</option>
            <option>Pesque-Pague</option>
          </Select>
        </InputGroup>
        <Button type="submit">Adicionar</Button>
      </FormControl>
    </Modal>
  );
};

const InputGroup = (props: any) => (
  <Flex display="flex" flexDirection="column" gap={1}>
    {props.children}
  </Flex>
);

const ErrorText = (props: { hasError: boolean; errorMsg: string }) =>
  props.hasError ? (
    <Text fontSize={14} color="red.400">
      {props.errorMsg}
    </Text>
  ) : null;
