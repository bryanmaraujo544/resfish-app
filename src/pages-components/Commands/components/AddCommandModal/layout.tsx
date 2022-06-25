/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import {
  FormControl,
  Input,
  Text,
  Flex,
  Button,
  Select,
} from '@chakra-ui/react';

import { Modal } from 'components/Modal';
import { SubmitHandler } from 'react-hook-form';

type AddCommandInputs = {
  table: string;
  waiter: string;
  fishingType: string;
};

type Props = {
  isModalOpen: boolean;
  handleCloseModal: () => any;
  handleAddCommand: SubmitHandler<AddCommandInputs>;
  rhfHandleSubmit: any;
  rhfRegister: any;
  rhfErrors: any;
  isAdding: boolean;
};

export const AddCommandModalLayout = ({
  isModalOpen,
  handleCloseModal,
  handleAddCommand,
  rhfHandleSubmit,
  rhfRegister,
  rhfErrors,
  isAdding,
}: Props) => (
  <Modal
    isOpen={isModalOpen}
    onClose={handleCloseModal}
    title="Adicionar Comanda"
  >
    <FormControl
      as="form"
      display="flex"
      flexDirection="column"
      gap={4}
      onSubmit={rhfHandleSubmit(handleAddCommand)}
    >
      <InputGroup>
        <Text>Mesa: </Text>
        <Input
          placeholder="João"
          {...rhfRegister('table', { required: true })}
        />
        <ErrorText
          hasError={rhfErrors?.table}
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
          <option>Pesque Pague</option>
        </Select>
      </InputGroup>
      <Button type="submit" isLoading={isAdding} loadingText="Adicionando">
        Adicionar
      </Button>
    </FormControl>
  </Modal>
);

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
