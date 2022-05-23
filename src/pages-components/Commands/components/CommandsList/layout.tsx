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
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiAddToQueue } from 'react-icons/bi';
import { CgOptions } from 'react-icons/cg';
import { FiEdit2 } from 'react-icons/fi';
import { FaArrowUp } from 'react-icons/fa';

import { formatDecimalNum } from 'utils/formatDecimalNum';

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
};

export const CommandsListLayout = ({
  items,
  orderBy,
  orderByDir,
  handleToggleOrderByDir,
}: Props) => {
  console.log('commands layout');
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="blue">
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
          {items.map(({ id, table, waiter, total }) => (
            <Tr key={`list-command-${id}`} h={20}>
              <Td>{table}</Td>
              <Td>{waiter}</Td>
              <Td>
                R$ {formatDecimalNum({ num: total.toString(), to: 'comma' })}
              </Td>
              <Td isNumeric>
                <Menu>
                  <MenuButton
                    p={1}
                    rounded={4}
                    _hover={{
                      bg: 'blue.50',
                    }}
                  >
                    <Icon as={CgOptions} fontSize={[16, 22]} color="blue.800" />
                  </MenuButton>
                  <MenuList>
                    <MenuItem icon={<BiAddToQueue />}>
                      Adicionar Produtos
                    </MenuItem>
                    <MenuItem icon={<FiEdit2 />}>Editar</MenuItem>
                    <MenuItem icon={<AiOutlineDelete />} color="red.500">
                      Deletar
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
