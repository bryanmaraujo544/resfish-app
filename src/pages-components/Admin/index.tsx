import { useRef, useState } from 'react';
import { Stack, Text, Flex, Button, useToast, Input } from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import { Modal } from 'components/Modal';
import AdminService from './services/index';

export const Admin = () => {
  const [isConfirmResetModalOpen, setIsConfirmResetModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const [isReseting, setIsReseting] = useState(false);

  const accessKey = useRef('');

  const toast = useToast();

  function handleOpenConfirmationModal() {
    setIsConfirmResetModalOpen(true);
  }

  function handleOpenResetModal() {
    setIsResetModalOpen(true);
    handleCloseConfirmationModal();
  }

  function handleCloseConfirmationModal() {
    setIsConfirmResetModalOpen(false);
  }

  function handleCloseResetModal() {
    setIsResetModalOpen(false);
    setIsReseting(false);
    accessKey.current = '';
  }
  async function handleResetSystem() {
    try {
      if (isReseting) {
        return;
      }
      setIsReseting(true);

      if (accessKey.current === '') {
        toast({
          status: 'error',
          title: 'Insira a chave de acesso para resetar o sistema',
        });
        setIsReseting(false);
        return;
      }

      await AdminService.deletePayments(accessKey.current);
      await AdminService.deleteCommands(accessKey.current);

      handleCloseResetModal();
      toast({
        title: 'Sistem resetado.',
      });
    } catch (err: any) {
      toast({
        status: 'error',
        title: err?.response?.data?.message,
        duration: 1000,
        isClosable: true,
      });
      setIsReseting(false);
    }
  }

  return (
    <>
      <Layout>
        <Stack w="100%" gap={[3, 6]}>
          <Flex
            bg="red.50"
            p={[3, 4, 6]}
            flexDir="column"
            align="center"
            rounded={4}
            border="1px solid"
            borderColor="red.100"
            fontSize={[16, 18, 20]}
            fontWeight={600}
            mt={4}
          >
            <Text color="red">
              Todas açoes executadas nesta página são de grande impacto no
              sistema
            </Text>
            <Text color="red">
              Apenas execute estas açoes quando todos os dados estiverem salvos
              localmente
            </Text>
          </Flex>
          <Stack>
            <Button
              onClick={() => handleOpenConfirmationModal()}
              colorScheme="red"
              fontSize={[18, 20]}
              h="auto"
              py={[3, 4]}
            >
              RESTAURAR SISTEMA
            </Button>
          </Stack>
        </Stack>
      </Layout>
      <Modal
        isOpen={isConfirmResetModalOpen}
        title="Deletar todos os dados do sistema?"
        onClose={handleCloseConfirmationModal}
      >
        <Flex gap={[2, 4]}>
          <Button flex="1" onClick={() => handleCloseConfirmationModal()}>
            Cancelar
          </Button>
          <Button onClick={handleOpenResetModal} colorScheme="red" flex="1">
            Confirmar
          </Button>
        </Flex>
      </Modal>
      <Modal
        isOpen={isResetModalOpen}
        onClose={handleCloseResetModal}
        title="Insira a chave de acesso para resetar o sistema"
      >
        <Stack gap={[2, 4]}>
          <Input
            onChange={(e) => {
              accessKey.current = e.target.value;
            }}
            placeholder="Chave de acesso"
            type="password"
          />
          <Button
            onClick={handleResetSystem}
            isLoading={isReseting}
            loadingText="Restaurando"
          >
            Confirmar
          </Button>
        </Stack>
      </Modal>
    </>
  );
};
