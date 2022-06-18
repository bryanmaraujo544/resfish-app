import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Box,
} from '@chakra-ui/react';
import { Modal } from 'components/Modal';
import { BsPatchCheckFill, BsPatchCheck } from 'react-icons/bs';
import { CgOptions } from 'react-icons/cg';
import { Order as OrderProps } from 'types/Order';
import { OrderProduct } from 'types/OrderProduct';

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
  isModalOpen: boolean;
  handleCloseModal: () => void;
  kitchenOrderSended: OrderProps;
  handleSelectAmountToShip: (product: OrderProduct) => void;
  productsToShipNow: OrderProduct[];
}

export const OrderActionsLayout = ({
  isModalOpen,
  handleCloseModal,
  kitchenOrderSended,
  handleSelectAmountToShip,
  productsToShipNow,
}: Props) => (
  <Modal title="" isOpen={isModalOpen} onClose={handleCloseModal}>
    <Stack>
      <Text fontWeight={600} fontSize={[16, 18]} color="blue.800">
        Produtos enviados à cozinha
      </Text>
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
            {kitchenOrderSended?.products?.map(
              ({ _id, name, amount, isMade }) => (
                <Tr key={`${kitchenOrderSended?._id}${_id}`}>
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
                            handleSelectAmountToShip({
                              _id,
                              name,
                              amount,
                              isMade,
                            })
                          }
                          display="flex"
                          icon={<BsPatchCheck fontSize={17} />}
                          fontWeight="600"
                          rounded={4}
                        >
                          <Text m={0}>Entregar agora</Text>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
    {productsToShipNow.length > 0 && (
      <Stack mt={2}>
        <Text fontWeight={600} color="blue.800">
          Produtos para entregar agora
        </Text>
        {productsToShipNow.map(({ _id, name, amount }) => (
          <Box
            key={`list-ship-now-${_id}`}
            bg="blue.50"
            p={2}
            rounded={4}
            boxShadow="sm"
          >
            <Text textAlign="center" fontWeight={600} color="blue.800">
              {name}, {amount}
            </Text>
          </Box>
        ))}
      </Stack>
    )}
  </Modal>
);
