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
} from '@chakra-ui/react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiAddToQueue } from 'react-icons/bi';
import { CgOptions } from 'react-icons/cg';
import { FiEdit2 } from 'react-icons/fi';
import { formatDecimalNum } from 'utils/formatDecimalNum';

const listColumns = ['Mesa', 'Garçom', 'Total', ''];

type Props = {
  items: any[];
};

export const CommandsListLayout = ({ items }: Props) => {
  console.log('commands layout');
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            {listColumns.map((listItem) => (
              <Th key={`command-list-${listItem}`}>{listItem}</Th>
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
              <Td>
                <Menu>
                  <MenuButton>
                    <Icon as={CgOptions} fontSize={[14, 18]} color="blue.800" />
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
