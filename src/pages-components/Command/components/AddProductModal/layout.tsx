/* eslint-disable react/no-children-prop */
import {
  InputGroup,
  InputLeftElement,
  Stack,
  Icon,
  Input,
  Grid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from '@chakra-ui/react';
import { BiSearchAlt } from 'react-icons/bi';

import { Modal } from 'components/Modal';

const filterOptions = [
  'Pesca',
  'Peixes',
  'Pratos',
  'Bebidas',
  'Doses',
  'Sobremesas',
  'Porções',
  'Misturas Congeladas',
];

const productsColumns = ['Nome', 'Quantidade', 'Preço Unid.'];

type Props = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  products: any[];
};

export const AddProductModalLayout = ({
  isModalOpen,
  handleCloseModal,
  products,
}: Props) => (
  <Modal
    isOpen={isModalOpen}
    onClose={() => handleCloseModal()}
    title="Adicionar Produto"
    size="6xl"
  >
    <Stack spacing={2}>
      {/* Header */}
      <Grid gridTemplateColumns={['1fr', '1fr 2fr']} gap={[2, 4]}>
        <Menu>
          <MenuButton as={Button}>Filtrar</MenuButton>
          <MenuList overflow="scroll">
            {filterOptions.map((filterText) => (
              <MenuItem key={`add-product-filter-${filterText}`}>
                {filterText}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={BiSearchAlt} />}
          />
          <Input placeholder="Pesquise por algum produto" />
        </InputGroup>
      </Grid>

      <TableContainer>
        <Table w="100%" mt={[2, 4]}>
          <Thead>
            <Tr>
              {productsColumns.map((column) => (
                <Th key={`add-product-table-header-${column}`}>{column}</Th>
              ))}
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {products?.map(({ id, name, unitPrice, amount }) => (
              <Tr key={`add-product-modal-product-${id}`}>
                <Td>{name}</Td>
                <Td>{amount}</Td>
                <Td>{unitPrice}</Td>
                <Td isNumeric>
                  <Button colorScheme="blue" bg="blue.400">
                    Adicionar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
    <Button colorScheme="red" onClick={() => handleCloseModal()}>
      Cancelar
    </Button>

    {/* <h1>Add Product</h1> */}
  </Modal>
);
