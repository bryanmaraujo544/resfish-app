import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import {
  Flex,
  Box,
  Text,
  Icon,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react';

import { BiIdCard } from 'react-icons/bi';
import { MdInventory2 } from 'react-icons/md';
import { GiCook } from 'react-icons/gi';
import { CgMenu } from 'react-icons/cg';

const headerButtons = [
  {
    text: 'Comandas',
    icon: BiIdCard,
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
  children: ReactNode;
}

export const HeaderLayout = ({
  handleLinkToPage,
  isSideMenuOpen,
  handleCloseSideMenu,
  handleOpenSideMenu,
  children,
}: Props) => {
  const { pathname } = useRouter();
  console.log('pathname');

  return (
    <>
      <Flex
        as="aside"
        align="center"
        justify="space-between"
        gap={6}
        flexDirection={['column', null, 'row']}
        py={[4, 6, 8, 10]}
        mb={[8, 10, 12, 14, 16]}
        w="100%"
      >
        <Box>
          <Text fontWeight={700} color="red.500" fontSize="2xl">
            Pesqueiro Arruda's
          </Text>
        </Box>
        <Flex
          gap={4}
          w={['100%', null, 'auto']}
          justify="center"
          align="center"
          h={[8, 10, 12]}
        >
          {children}
          <Button
            onClick={handleOpenSideMenu}
            h="100%"
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
            <Flex direction="column" gap={[2, 4, 6]} mt={[2, 4, 6]}>
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
                  _hover={{
                    bg: 'blue.100',
                    color: 'blue.900',
                  }}
                  _active={{
                    bg: 'blue.100',
                    color: 'blue.800',
                  }}
                  h={[12]}
                  w="100%"
                >
                  <Icon as={BtnIcon} />
                  {text}
                </Button>
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
