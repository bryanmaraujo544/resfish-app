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
    text: 'Estoque',
    icon: MdInventory2,
    path: '/stock',
  },
  {
    text: 'Cozinha',
    icon: GiCook,
    path: '/kitchen',
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
      py={[4, 6, 8, 10]}
      px={[8, 12, 14, 16]}
    >
      <Box>
        <Text fontWeight={700} color="red.500" fontSize="2xl">
          Pesqueiro Arruda's
        </Text>
      </Box>
      <Flex gap={4}>
        {headerButtons.map(({ text, icon: BtnIcon, path }) => (
          <Button
            onClick={() => handleLinkToPage(path)}
            alignItems="center"
            gap={2}
            bg={pathname === path ? 'blue.400' : 'blue.50'}
            color={pathname === path ? 'blue.50' : 'blue.800'}
            boxShadow="base"
            fontSize="xl"
            fontWeight={600}
            p={6}
            _hover={{
              bg: 'red.50',
              color: 'red.900',
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
