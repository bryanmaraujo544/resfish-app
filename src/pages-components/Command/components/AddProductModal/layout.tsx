/* eslint-disable react/no-children-prop */
import { Dispatch, SetStateAction } from 'react';
import {
  InputGroup,
  InputLeftElement,
  Stack,
  Icon,
  Input,
  Grid,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Text,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from '@chakra-ui/react';
import { BiSad, BiSearchAlt } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

import { Modal } from 'components/Modal';
import { formatDecimalNum } from 'utils/formatDecimalNum';
import { formatAmount } from 'utils/formatAmount';
import { parseToBRL } from 'utils/parseToBRL';

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

interface ProductNoAmount {
  _id?: string;
  name: string;
  unitPrice: number;
  category: string;
}

interface Props {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  products: any[];
  selectedProducts: any[];
  handleOpenAmountModal: ({ product }: { product: ProductNoAmount }) => void;
  // eslint-disable-next-line no-unused-vars
  handleRemoveSelectedProduct: ({ id }: { id: string }) => void;
  handleAddProductsInCommand: () => void;
  filter: string;
  searchContent: string;
  setSearchContent: Dispatch<SetStateAction<string>>;
  // eslint-disable-next-line no-unused-vars
  handleChangeFilter: (selectedFilter: string) => void;
  isAddingProducts: boolean;
  handleFavoriteProduct: (_id: string) => void;
  handleUnfavoriteProduct: (_id: string) => void;
}

export const AddProductModalLayout = ({
  isModalOpen,
  handleCloseModal,
  products,
  selectedProducts,
  handleOpenAmountModal,
  handleRemoveSelectedProduct,
  handleAddProductsInCommand,
  filter,
  handleChangeFilter,
  searchContent,
  setSearchContent,
  isAddingProducts,
  handleFavoriteProduct,
  handleUnfavoriteProduct,
}: Props) => (
  <Modal
    isOpen={isModalOpen}
    onClose={() => handleCloseModal()}
    title="Adicionar Produto"
    size="full"
    modalBodyOverflow="hidden"
  >
    <Stack spacing={[4, 6]} overflowY="scroll">
      {/* Header */}
      <Grid gridTemplateColumns={['1fr', '1fr 3fr']} gap={[2, 4]}>
        <Menu>
          <MenuButton
            bg="blue.50"
            color="blue.800"
            _active={{
              bg: 'blue.300',
              color: 'white',
            }}
            as={Button}
          >
            <Flex align="center" justify="center" gap={[1, 3]}>
              Filtrar
              {filter && <Square />}
            </Flex>
          </MenuButton>
          <MenuList overflow="scroll" bg="blue.50" p={2}>
            {filterOptions.map((filterText) => (
              <MenuItem
                key={`add-product-filter-${filterText}`}
                onClick={() => handleChangeFilter(filterText)}
                bg={filter === filterText ? 'blue.300' : 'none'}
                color={filter === filterText ? 'white' : 'blue.800'}
                rounded={4}
                _focus={{
                  bg: 'blue.100',
                }}
              >
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
          <Input
            placeholder="Pesquise por algum produto"
            value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)}
          />
        </InputGroup>
      </Grid>

      {/* Products selected */}
      <Grid gridTemplateColumns="repeat(3, 1fr)" gap={[2, 4]}>
        {selectedProducts.map(({ _id, name, amount }) => (
          <Flex
            key={`selected-product-${_id}`}
            // direction="column"
            align="center"
            justify="space-between"
            bg="gray.100"
            p={2}
            rounded="md"
            color="blue.700"
          >
            <Flex gap={6} align="center">
              <Text fontSize={14} fontWeight={600}>
                {name}
              </Text>
              <Text fontSize={14} fontWeight={600}>
                Qntd: {formatAmount({ num: amount, to: 'comma' })}
              </Text>
            </Flex>
            <Icon
              as={IoClose}
              onClick={() => handleRemoveSelectedProduct({ id: _id })}
              cursor="pointer"
              fontSize={[16, 18]}
              _hover={{
                bg: 'blue.100',
                rounded: 3,
              }}
              _active={{
                bg: 'blue.200',
              }}
            />
          </Flex>
        ))}
      </Grid>

      {/* List of products to add in command */}
      <TableContainer overflowY="scroll">
        <Table w="100%" mt={[2, 4]} size="sm">
          <Thead>
            <Tr>
              {productsColumns.map((column) => (
                <Th key={`add-product-table-header-${column}`}>{column}</Th>
              ))}
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {products?.length > 0 &&
              products?.map(
                ({ _id, name, unitPrice, amount, category, isFavorite }) => (
                  <Tr key={`add-product-modal-product-${_id}`}>
                    <Td>{name}</Td>
                    <Td>{amount}</Td>
                    <Td>{parseToBRL(unitPrice || 0)}</Td>
                    <Td isNumeric>
                      <Flex justify="flex-end" align="center" gap={2}>
                        <Button
                          bg="blue.50"
                          color="blue.700"
                          onClick={() =>
                            handleOpenAmountModal({
                              product: { _id, name, unitPrice, category },
                            })
                          }
                        >
                          Selecionar
                        </Button>

                        {isFavorite ? (
                          <Icon
                            onClick={() => handleUnfavoriteProduct(_id)}
                            as={AiFillStar}
                            fontSize={[18, 20]}
                            color="blue.600"
                            cursor="pointer"
                            _hover={{
                              color: 'blue.700',
                            }}
                          />
                        ) : (
                          <Icon
                            onClick={() => handleFavoriteProduct(_id)}
                            as={AiOutlineStar}
                            fontSize={[18, 20]}
                            color="blue.600"
                            cursor="pointer"
                            _hover={{
                              color: 'blue.700',
                            }}
                          />
                        )}
                      </Flex>
                    </Td>
                  </Tr>
                )
              )}
            {products?.length === 0 && (
              <Tr>
                <Td>
                  <Flex align="center" gap={4} mt={4} color="blue.700">
                    <Icon as={BiSad} fontSize={32} />
                    <Text fontSize={20} fontWeight={600}>
                      Nenhum Produto com essa categoria
                    </Text>
                  </Flex>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Grid gridTemplateColumns={['1fr', '1fr 1fr']} gap={4}>
        <Button onClick={() => handleCloseModal()}>Cancelar</Button>
        <Button
          onClick={() => handleAddProductsInCommand()}
          colorScheme="blue"
          isLoading={isAddingProducts}
          loadingText="Adicionando Produtos"
        >
          Adicionar Produtos
        </Button>
      </Grid>
    </Stack>

    {/* <h1>Add Product</h1> */}
  </Modal>
);

const Square = () => (
  <Box
    w={[1, 1, 2]}
    h={[1, 1, 2]}
    mt={[0, 0, 1]}
    ml={[0, 0, 1]}
    rounded={2}
    bg="blue.200"
  />
);
