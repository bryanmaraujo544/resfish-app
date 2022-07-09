/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/destructuring-assignment */
import {
  Heading,
  Spinner,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Grid,
  GridItem,
  Stack,
  Button,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';

import { CgOptions } from 'react-icons/cg';
import { MdVerified } from 'react-icons/md';
import { BsFillTrashFill } from 'react-icons/bs';
import { IoCashOutline } from 'react-icons/io5';
import { FaPercentage } from 'react-icons/fa';

import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import { Command } from 'types/Command';
import { GiCook } from 'react-icons/gi';
import { parseToBRL } from 'utils/parseToBRL';
import { NavHeader } from './components/NavHeader';
import { ProductsList } from './components/ProductsList';

interface Props {
  command: Command;
  isLoading: boolean;
  totalToBePayed: number;
  handleGoToCommands?: () => void;
  handleOpenPaymentModal: () => void;
  handleDeleteCommand: () => void;
  handleOpenSentToKitchenModal: () => void;
  handleOpenCloseCommandModal: () => void;
  handleEditDiscount: () => void;
}

export const CommandLayout = ({
  command,
  isLoading,
  handleGoToCommands,
  handleOpenPaymentModal,
  handleDeleteCommand,
  handleOpenSentToKitchenModal,
  handleOpenCloseCommandModal,
  totalToBePayed,
  handleEditDiscount,
}: Props) => {
  const dt = DateTime.fromISO(command?.createdAt as string, {
    zone: 'pt-BR',
    setZone: true,
  }).setLocale('pt-BR');
  const createdAtFormatted = dt.toLocaleString(DateTime.DATETIME_MED);

  return (
    <Layout>
      <Header hasBackPageBtn handleBackPage={handleGoToCommands}>
        {command?.isActive === false ? (
          <BgBox
            bg="green.300"
            gap={3}
            display="flex"
            align="center"
            justify="center"
          >
            <Heading fontSize={[18, 22, 26]} color="green.50">
              COMANDA PAGA
            </Heading>
            <Icon
              as={MdVerified}
              fontSize={[18, 22, 26]}
              m={0}
              color="green.50"
            />
          </BgBox>
        ) : (
          <Button
            onClick={() => handleOpenSentToKitchenModal()}
            display="flex"
            alignItems="center"
            gap={3}
            bg="blue.50"
            border="1px solid"
            borderColor="gray.300"
            h="100%"
            as="button"
            _hover={{
              bg: 'blue.200',
            }}
            _active={{
              bg: 'blue.200',
            }}
            color="blue.800"
          >
            <Heading
              fontSize={[14, 16, 18]}
              textAlign="center"
              color="blue.800"
            >
              Mandar para Cozinha
            </Heading>
            <Icon as={GiCook} />
          </Button>
        )}
      </Header>
      {isLoading ? (
        <Spinner
          size="xl"
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
        />
      ) : (
        <>
          <Grid
            gridTemplateColumns={['1fr', '1fr', '1fr', '1fr auto']}
            mb={4}
            gap={2}
          >
            <GridItem
              display="flex"
              justifyContent={['center', 'center', 'center', 'flex-start']}
            >
              <Stack align={['center', 'center', 'center', 'flex-start']}>
                <BgBox w={['100%', '100%', '100%', 'auto']} justify="center">
                  <Heading fontSize={[16, 20, 22]} textAlign="center">
                    Comanda: {command?.table}
                  </Heading>
                </BgBox>
                <Text fontSize={[14, 16]} color="blue.700">
                  {createdAtFormatted}
                </Text>
              </Stack>
            </GridItem>
            <GridItem>
              <Flex
                gap={2}
                flexDir={['column', 'column', 'row', 'row']}
                justify={['center', 'center', 'center', 'flex-end']}
                align="stretch"
              >
                <BgBox w={['100%', 'auto']} justify="center">
                  <Heading fontSize={[14, 16, 20, 22]}>
                    Total: {parseToBRL(command?.total || 0)}
                  </Heading>
                </BgBox>
                <BgBox w={['100%', 'auto']} justify="center">
                  <Heading fontSize={[14, 16, 20, 22]}>
                    A Pagar: {parseToBRL(totalToBePayed || 0)}
                  </Heading>
                </BgBox>
                <Button
                  onClick={() => handleOpenPaymentModal()}
                  isDisabled={command.isActive === false}
                  bg="blue.50"
                  color="blue.500"
                  fontWeight="700"
                  display="flex"
                  justifyItems="center"
                  alignItems="center"
                  rounded={4}
                  gap={2}
                  _focus={{
                    bg: 'green.100',
                    color: 'green.500',
                  }}
                  _hover={{
                    bg: 'green.100',
                    color: 'green.500',
                  }}
                  fontSize={[14, 16, 20]}
                >
                  <Icon as={IoCashOutline} mt={0.8} />
                  <Text>Pagar</Text>
                </Button>
                <Menu>
                  <MenuButton
                    bg="blue.50"
                    rounded={4}
                    _hover={{
                      bg: 'blue.50',
                    }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    px={3}
                  >
                    <Icon
                      as={CgOptions}
                      fontSize={[16, 22]}
                      display="inline-block"
                      m={0}
                      p={0}
                      mt={1.5}
                      color="blue.800"
                    />
                  </MenuButton>

                  <MenuList bg="blue.50" p={2}>
                    <MenuItem
                      icon={<IoCashOutline fontSize={14} />}
                      onClick={() => handleOpenCloseCommandModal()}
                      isDisabled={command.isActive === false}
                      color="blue.400"
                      fontWeight="700"
                      display="flex"
                      alignItems="center"
                      rounded={4}
                      _focus={{
                        bg: 'blue.100',
                        color: 'blue.500',
                      }}
                      _hover={{
                        bg: 'blue.100',
                        color: 'blue.500',
                      }}
                    >
                      <Text>Fechar Comanda</Text>
                    </MenuItem>
                    <MenuItem
                      icon={<FaPercentage fontSize={14} />}
                      onClick={() => handleEditDiscount()}
                      isDisabled={command.isActive === false}
                      color="blue.900"
                      display="flex"
                      alignItems="center"
                      rounded={4}
                      _focus={{
                        bg: 'blue.100',
                        color: 'blue.500',
                      }}
                      _hover={{
                        bg: 'blue.100',
                        color: 'blue.500',
                      }}
                    >
                      <Text>Editar Desconto</Text>
                    </MenuItem>
                    <MenuItem
                      icon={<BsFillTrashFill fontSize={14} />}
                      onClick={() => handleDeleteCommand()}
                      color="blue.900"
                      display="flex"
                      alignItems="center"
                      rounded={4}
                      _focus={{
                        bg: 'red.100',
                        color: 'red.500',
                      }}
                      _hover={{
                        bg: 'red.100',
                        color: 'red.500',
                      }}
                    >
                      <Text>Deletar Comanda</Text>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </GridItem>
          </Grid>
          {command?.isActive && <NavHeader />}
          <ProductsList />
        </>
      )}
    </Layout>
  );
};

const BgBox = (props: any) => (
  <Flex
    align="center"
    boxShadow="sm"
    bg="blue.50"
    color="blue.700"
    px={4}
    py={2}
    rounded={4}
    {...props}
  >
    {props.children}
  </Flex>
);
