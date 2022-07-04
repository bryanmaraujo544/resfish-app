/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import {
  Flex,
  Icon,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Box,
} from '@chakra-ui/react';
import Image from 'next/image';

import { MdInventory2 } from 'react-icons/md';
import { GiCook } from 'react-icons/gi';
import { CgMenu } from 'react-icons/cg';
import { FaArrowUp } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { IoMdListBox } from 'react-icons/io';
import Logo from '../../assets/logo.jpeg';

const headerButtons = [
  {
    text: 'Home',
    icon: AiFillHome,
    path: '/',
  },
  {
    text: 'Comandas',
    icon: IoMdListBox,
    path: '/commands',
  },
  {
    text: 'Cozinha',
    icon: GiCook,
    path: '/kitchen',
  },
  {
    text: 'Estoque',
    icon: MdInventory2,
    path: '/stock',
  },
];

interface Props {
  handleLinkToPage: any;
  isSideMenuOpen: boolean;
  handleCloseSideMenu: any;
  handleOpenSideMenu: any;
  hasBackPageBtn?: boolean;
  handleBackPage?: any;
  children: ReactNode;
}

export const HeaderLayout = ({
  handleLinkToPage,
  isSideMenuOpen,
  handleCloseSideMenu,
  handleOpenSideMenu,
  hasBackPageBtn,
  handleBackPage,
  children,
}: Props) => {
  const { pathname } = useRouter();

  return (
    <>
      <Flex
        as="aside"
        align="center"
        justify="space-between"
        gap={6}
        flexDirection={['column', null, 'row']}
        py={[4, 6, 8]}
        mb={[1, 2]}
        w="100%"
      >
        <Flex gap={2} align="center">
          {hasBackPageBtn && (
            <Button
              onClick={handleBackPage}
              transform="rotate(-90deg)"
              color="red.900"
              bg="red.50"
              _hover={{
                bg: 'red.100',
                color: 'red.900',
              }}
              _active={{
                bg: 'red.50',
                color: 'red.800',
              }}
              boxShadow="base"
            >
              <Icon as={FaArrowUp} />
            </Button>
          )}
          <Box position="relative" width={[12, 16]} height={[12, 16]}>
            <Image src={Logo} alt="logo" layout="fill" objectFit="contain" />
          </Box>
        </Flex>
        <Flex
          gap={4}
          w={['100%', null, 'auto']}
          justify="center"
          align="center"
          h={[10, 12]}
        >
          {children}
          <Button
            onClick={handleOpenSideMenu}
            h="100%"
            bg="red.50"
            color="red.900"
            _hover={{
              bg: 'red.100',
              color: 'red.900',
            }}
            _active={{
              bg: 'red.50',
              color: 'red.800',
            }}
            boxShadow="base"
          >
            <Icon as={CgMenu} fontSize={['sm', 'md', 'lg', '3xl']} />
          </Button>
        </Flex>
      </Flex>
      <Drawer
        placement="right"
        isOpen={isSideMenuOpen}
        onClose={handleCloseSideMenu}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Flex direction="column" gap={[6]} mt={[2, 4, 6]}>
              {headerButtons.map(({ text, icon: BtnIcon, path }) => (
                <Button
                  key={`header-btn-${path}`}
                  onClick={() => handleLinkToPage(path)}
                  alignItems="center"
                  gap={[1, 1, 2]}
                  bg={pathname === path ? 'blue.400' : 'blue.50'}
                  color={pathname === path ? 'blue.50' : 'blue.800'}
                  boxShadow="base"
                  fontSize={['sm', 'md', 'lg']}
                  fontWeight={600}
                  p={[2, 4, 6]}
                  justifyContent="space-between"
                  _hover={{
                    bg: 'blue.100',
                    color: 'blue.900',
                  }}
                  _active={{
                    bg: 'blue.100',
                    color: 'blue.800',
                  }}
                  h={[12, 14]}
                  w="100%"
                >
                  {text}
                  <Icon as={BtnIcon} />
                </Button>
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
