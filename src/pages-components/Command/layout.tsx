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
} from '@chakra-ui/react';
import { CgOptions } from 'react-icons/cg';
import { MdVerified } from 'react-icons/md';
import { BsFillTrashFill } from 'react-icons/bs';
import { IoCashOutline } from 'react-icons/io5';

import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import { Command } from 'types/Command';
import { formatDecimalNum } from 'utils/formatDecimalNum';
import { NavHeader } from './components/NavHeader';
import { ProductsList } from './components/ProductsList';

interface Props {
  command: Command;
  isLoading: boolean;
  handleGoToCommands?: () => void;
  handleOpenPaymentModal: () => void;
}

export const CommandLayout = ({
  command,
  isLoading,
  handleGoToCommands,
  handleOpenPaymentModal,
}: Props) => (
  <Layout>
    <Header hasBackPageBtn handleBackPage={handleGoToCommands}>
      {command.isActive === false && (
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
        <Flex justify="space-between" mb={4} flexWrap="wrap">
          <BgBox>
            <Heading fontSize={[16, 20, 22]}>Comanda: {command?.table}</Heading>
          </BgBox>
          <Flex gap={2}>
            <BgBox>
              <Heading fontSize={[16, 20, 22]}>
                Total: R${' '}
                {formatDecimalNum({
                  num: command?.total?.toString() || '0',
                  to: 'comma',
                })}
              </Heading>
            </BgBox>
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
                  display="block"
                  color="blue.800"
                />
              </MenuButton>
              <MenuList bg="blue.50" p={2}>
                <MenuItem
                  icon={<IoCashOutline fontSize={14} />}
                  onClick={() => handleOpenPaymentModal()}
                  isDisabled={command.isActive === false}
                  color="green.400"
                  fontWeight="700"
                  display="flex"
                  alignItems="center"
                  rounded={4}
                  _focus={{
                    bg: 'green.100',
                    color: 'green.500',
                  }}
                  _hover={{
                    bg: 'green.100',
                    color: 'green.500',
                  }}
                >
                  <Text>Pagar</Text>
                </MenuItem>
                <MenuItem
                  icon={<BsFillTrashFill fontSize={14} />}
                  onClick={() => {}}
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
        </Flex>
        {command.isActive && <NavHeader />}
        <ProductsList />
      </>
    )}
  </Layout>
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
    {...props}
  >
    {props.children}
  </Flex>
);
