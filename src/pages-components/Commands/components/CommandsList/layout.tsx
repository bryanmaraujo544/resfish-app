import {
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
  Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiAddToQueue } from 'react-icons/bi';
import { CgOptions } from 'react-icons/cg';
import { FiEdit2 } from 'react-icons/fi';
import { FaArrowUp } from 'react-icons/fa';

import { Command } from 'types/Command';
import { MdVerified } from 'react-icons/md';
import { parseToBRL } from 'utils/parseToBRL';

const listColumns = [
  {
    text: 'Mesa',
    prop: 'table',
  },
  {
    text: 'Garçom',
    prop: 'waiter',
  },
  {
    text: 'Total',
    prop: 'total',
  },
  {
    text: '',
    prop: '*',
  },
];

type Props = {
  items: any[];
  orderBy: string;
  orderByDir: 'asc' | 'desc';
  handleToggleOrderByDir: () => void;
  handleGoToCommandPage: ({ commandId }: { commandId: string }) => void;
  handleOpenAddProductsModal: (commandId: string) => void;
  handleOpenEditCommandModal: (command: Command) => void;
  handleOpenDeleteCommandModal: (commandId: string) => void;
};

export const CommandsListLayout = ({
  items,
  orderBy,
  orderByDir,
  handleToggleOrderByDir,
  handleGoToCommandPage,
  handleOpenAddProductsModal,
  handleOpenEditCommandModal,
  handleOpenDeleteCommandModal,
}: Props) => (
  <TableContainer minHeight={400} pb={32}>
    <Table colorScheme="gray" overflow="visible" minHeight={100}>
      <Thead>
        <Tr>
          {listColumns.map(({ text: listItem, prop }) => (
            <Th key={`command-list-${listItem}`}>
              <Flex align="center" gap={2}>
                {listItem}{' '}
                {orderBy.toLowerCase() === prop.toLowerCase() && (
                  <motion.div
                    onClick={() => handleToggleOrderByDir()}
                    style={{
                      transform:
                        orderByDir === 'asc'
                          ? 'rotate(0deg)'
                          : 'rotate(180deg)',
                      cursor: 'pointer',
                    }}
                  >
                    <Icon as={FaArrowUp} fontSize={14} />
                  </motion.div>
                )}
              </Flex>
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {items.length > 0 ? (
          items.map(({ _id, table, waiter, total, fishingType, isActive }) => (
            <Tr
              key={`list-command-${_id}`}
              h={20}
              cursor="pointer"
              _hover={{ bg: 'blue.50' }}
            >
              <Td onClick={() => handleGoToCommandPage({ commandId: _id })}>
                {table}
              </Td>
              <Td onClick={() => handleGoToCommandPage({ commandId: _id })}>
                {waiter}
              </Td>
              <Td onClick={() => handleGoToCommandPage({ commandId: _id })}>
                {parseToBRL(total || 0)}
              </Td>
              <Td isNumeric>
                {isActive === false && (
                  <Flex
                    align="center"
                    bg="green.300"
                    display="inline-flex"
                    gap={2}
                    rounded={4}
                    py={1}
                    px={[1, 3]}
                    mr={[1, 2]}
                  >
                    <Icon
                      as={MdVerified}
                      fontSize={[18, 22, 24]}
                      m={0}
                      color="green.50"
                    />
                    <Text
                      fontSize={[14, 16, 18]}
                      fontWeight="600"
                      color="green.50"
                    >
                      Paga
                    </Text>
                  </Flex>
                )}
                <Menu>
                  <MenuButton
                    p={1}
                    rounded={4}
                    _hover={{
                      bg: 'blue.50',
                    }}
                  >
                    <Icon
                      as={CgOptions}
                      fontSize={[16, 22]}
                      color="blue.800"
                      display="block"
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      icon={<BiAddToQueue />}
                      onClick={() => handleOpenAddProductsModal(_id)}
                      display="flex"
                      alignItems="center"
                      isDisabled={isActive === false}
                    >
                      <Text>Adicionar Produtos</Text>
                    </MenuItem>
                    <MenuItem
                      icon={<FiEdit2 />}
                      onClick={() =>
                        handleOpenEditCommandModal({
                          _id,
                          fishingType,
                          table,
                          waiter,
                        })
                      }
                      isDisabled={isActive === false}
                      display="flex"
                      alignItems="center"
                    >
                      <Text>Editar</Text>
                    </MenuItem>
                    <MenuItem
                      icon={<AiOutlineDelete />}
                      color="red.500"
                      onClick={() => handleOpenDeleteCommandModal(_id)}
                      display="flex"
                      alignItems="center"
                    >
                      <Text>Deletar</Text>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td>
              <Text
                bg="blue.50"
                py={3}
                px={4}
                fontSize={[18, 20, 22]}
                fontWeight={600}
                color="blue.800"
                border="1px solid"
                borderColor="gray.300"
                rounded={4}
                mt={4}
              >
                Nenhuma há nenhuma comanda :(
              </Text>
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  </TableContainer>
);
