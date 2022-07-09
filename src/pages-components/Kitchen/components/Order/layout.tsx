import {
  Stack,
  Button,
  Text,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Menu,
  MenuButton,
  Icon,
  MenuItem,
  MenuList,
  Flex,
  Box,
} from '@chakra-ui/react';
import { CgOptions } from 'react-icons/cg';
import { BsPatchCheck, BsPatchCheckFill } from 'react-icons/bs';

import { OrderProduct } from 'types/OrderProduct';
import { DateTime } from 'luxon';
import { Order } from '../../../../types/Order';

const productColumns = [
  {
    text: 'Nome',
    prop: 'name',
  },
  {
    text: 'Quantidade',
    prop: 'amount',
  },
  { text: '', prop: '*' },
];

interface Props {
  order: Order;
  handleCheckOneProduct: (product: OrderProduct) => void;
  handleOpenCheckOrderModal: (orderToCheck: Order) => void;
}

export const OrderLayout = ({
  order,
  handleCheckOneProduct,
  handleOpenCheckOrderModal,
}: Props) => {
  const dt = DateTime.fromISO(order?.createdAt as string, {
    zone: 'pt-BR',
    setZone: true,
  }).setLocale('pt-BR');

  const createdAtFormatted = dt.toLocaleString(DateTime.TIME_24_SIMPLE);

  return (
    <Stack
      bg="blue.50"
      p={[2, 4]}
      rounded={[2, 4]}
      mt={[4, 6]}
      border="1px solid"
      borderColor="gray.300"
      gap={[1, 2]}
    >
      <Flex justifyContent="space-between" align="center">
        <Text color="blue.800" fontSize={[18, 20]} fontWeight={600}>
          Mesa:{' '}
          <Box as="span" display="inline-block" fontWeight={700}>
            {order?.table}
          </Box>
        </Text>
        <Text>
          Criado:{' '}
          <Box as="span" fontWeight={600}>
            {createdAtFormatted}
          </Box>
        </Text>
      </Flex>
      {order.observation && <Text color="blue.800">{order.observation}</Text>}
      <TableContainer
        bg="whiteAlpha.700"
        // bg="blue.50"
        color="blue.900"
        py={[2, 3]}
        rounded={4}
        boxShadow="sm"
        overflow="visible"
        pb="42px !important"
      >
        <Table size="md" textAlign="left">
          <Thead>
            <Tr>
              {productColumns.map((column) => (
                <Th
                  key={`kitchen-order-product-column-${column.prop}`}
                  color="blue.900"
                >
                  {column.text}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {order.products.map(({ _id, name, amount, isMade }) => (
              <Tr key={`${order._id}${_id}`}>
                <Td w="50%">{name}</Td>
                <Td w="40%">{amount}</Td>
                <Td
                  isNumeric
                  display="flex"
                  gap={2}
                  align="center"
                  justifyContent="flex-end"
                >
                  {isMade && (
                    <Flex bg="green.300" gap={2} px={2} py={1} rounded={3}>
                      <Icon
                        as={BsPatchCheckFill}
                        color="white"
                        mt={0.5}
                        fontSize={[16, 18]}
                      />
                      <Text fontWeight={600} color="white">
                        Feito
                      </Text>
                    </Flex>
                  )}
                  <Menu>
                    <MenuButton>
                      <Icon
                        as={CgOptions}
                        fontSize={[16, 22]}
                        display="block"
                        color="blue.800"
                      />
                    </MenuButton>
                    <MenuList p={1.5}>
                      <MenuItem
                        onClick={() =>
                          handleCheckOneProduct({ _id, name, amount, isMade })
                        }
                        display="flex"
                        icon={<BsPatchCheck fontSize={17} />}
                        fontWeight="600"
                        rounded={4}
                      >
                        <Text m={0}>Marcar como feito</Text>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Button
        onClick={() => handleOpenCheckOrderModal(order)}
        colorScheme="blue"
      >
        Marcar como Feito
      </Button>
    </Stack>
  );
};
