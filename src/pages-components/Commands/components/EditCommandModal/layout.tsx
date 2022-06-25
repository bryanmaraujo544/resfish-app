/* eslint-disable react/destructuring-assignment */
import { FormControl, Input, Button, Flex, Text } from '@chakra-ui/react';
import { Modal } from 'components/Modal';
import { ReactNode } from 'react';
import { SubmitHandler } from 'react-hook-form';

interface EditCommandInputs {
  table: string;
  waiter: string;
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
}: Props) => (
  <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Editar comanda">
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
      <Button type="submit">Atualizar</Button>
    </FormControl>
  </Modal>
);

const InputGroup = ({ children }: { children: ReactNode }) => (
  <Flex display="flex" flexDirection="column" gap={1}>
    {children}
  </Flex>
);

const ErrorText = (props: { hasError: boolean; errorMsg: string }) =>
  props.hasError ? (
    <Text fontSize={14} color="red.400">
      {props.errorMsg}
    </Text>
  ) : null;
