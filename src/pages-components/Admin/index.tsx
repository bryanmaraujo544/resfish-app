import { useState } from 'react';
import { Stack, Text, Flex, Button, useToast } from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import { Modal } from 'components/Modal';

export const Admin = () => {
  const [isConfirmResetModalOpen, setIsConfirmResetModalOpen] = useState(false);
  const [isReseting, setIsReseting] = useState(false);
  const toast = useToast();

  function handleConfirmReset() {
    setIsConfirmResetModalOpen(true);
  }

  function handleCloseModal() {
    setIsConfirmResetModalOpen(false);
    setIsReseting(false);
  }

  async function handleResetSystem() {
    try {
      if (isReseting) {
        return;
      }
      setIsReseting(true);

      // eslint-disable-next-line @typescript-eslint/no-empty-function
      await new Promise((resolve) => {
        setTimeout(() => resolve('a'), 1000);
      });

      handleCloseModal();
      toast({
        title: 'Função em desenvolvimento',
      });
    } catch (err: any) {
      toast({
        status: 'error',
        title: 'Algo deu errado. Recarregue a página',
        duration: 1000,
        isClosable: true,
      });
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
              onClick={() => handleConfirmReset()}
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
        onClose={handleCloseModal}
      >
        <Flex>
          <Button flex="1" onClick={() => handleCloseModal()}>
            Cancelar
          </Button>
          <Button
            onClick={handleResetSystem}
            colorScheme="red"
            flex="1"
            isLoading={isReseting}
            loadingText="Restaurando"
          >
            Confirmar
          </Button>
        </Flex>
      </Modal>
    </>
  );
};
