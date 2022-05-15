import { Flex, Box, Text, Icon, Button } from '@chakra-ui/react';

import { BiIdCard } from 'react-icons/bi';
import { MdInventory2 } from 'react-icons/md';
import { GiCook } from 'react-icons/gi';
import { useRouter } from 'next/router';

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
}

export const HeaderLayout = ({ handleLinkToPage }: Props) => {
  const { pathname } = useRouter();
  console.log(pathname);
  return (
    <Flex
      as="header"
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
      <Flex gap={4} w={['100%', null, 'auto']} justify="center">
        {headerButtons.map(({ text, icon: BtnIcon, path }) => (
          <Button
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
          >
            <Icon as={BtnIcon} />
            {text}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};
