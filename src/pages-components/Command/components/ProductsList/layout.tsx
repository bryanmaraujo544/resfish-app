/* eslint-disable @typescript-eslint/no-empty-function */
import { Dispatch, SetStateAction, useContext } from 'react';
import {
  Flex,
  Icon,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  FormControl,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { BsFillTrashFill } from 'react-icons/bs';
import { FaArrowUp } from 'react-icons/fa';
import { CgOptions } from 'react-icons/cg';
import { IoCashOutline } from 'react-icons/io5';
import { BiSad } from 'react-icons/bi';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';

import { Product } from 'types/Product';
import { formatAmount } from 'utils/formatAmount';
import { useClickOutsideToClose } from 'hooks/useClickOutsideToClose';
import { CommandContext } from 'pages-components/Command';
import { parseToBRL } from 'utils/parseToBRL';

const columns = [
  {
    text: 'Nome',
    prop: 'name',
  },
  {
    text: 'Quantidade',
    prop: 'amount',
  },
  {
    text: 'Preço Unid',
    prop: 'unitPrice',
  },
  {
    text: 'Total',
    prop: 'total',
  },
  {
    text: 'Pago',
    prop: 'totalPayed',
  },
];

interface ActiveEditFish {
  productId: string;
  amount: string;
}

interface AmountProduct {
  _id: string;
  unitPrice: number;
  totalPayed: number;
  amount: number;
}

interface Props {
  products: any[];
  handleOpenDeleteModal: ({ productId }: { productId: string }) => void;
  handleToggleOrderByDir: () => void;
  orderBy: string;
  orderByDir: 'asc' | 'desc';
  fishIdToEditAmount: string;
  handleActiveEditFishAmount: ({ productId, amount }: ActiveEditFish) => void;
  handleUpdateProductAmount: any;
  newProductAmount: string;
  setNewProductAmount: Dispatch<SetStateAction<string>>;
  setFishIdToEditAmount: Dispatch<SetStateAction<string>>;
  handleOpenPayProductModal: (product: Product) => void;
  handleDecrementProductAmount: (product: AmountProduct) => void;
  handleIncrementProductAmount: ({
    productId,
    amount,
  }: {
    productId: string;
    amount: number;
  }) => void;
}

export const ProductsListLayout = ({
  products,
  handleOpenDeleteModal,
  orderBy,
  orderByDir,
  handleToggleOrderByDir,
  handleActiveEditFishAmount,
  fishIdToEditAmount,
  handleUpdateProductAmount,
  newProductAmount,
  setNewProductAmount,
  setFishIdToEditAmount,
  handleOpenPayProductModal,
  handleIncrementProductAmount,
  handleDecrementProductAmount,
}: Props) => {
  const { command } = useContext(CommandContext);
  const commandIsPayed = command?.isActive === false;

  const isFishingCategory = (category?: string) =>
    category?.toLowerCase() === 'peixes' ||
    category?.toLowerCase() === 'misturas congeladas';

  const editAmountInputRef = useClickOutsideToClose(() => {
    setFishIdToEditAmount('');
  });

  return (
    <TableContainer mt={16} minHeight={400} pb={32}>
      <Table overflow="visible" minHeight={100}>
        <Thead>
          <Tr>
            {columns.slice(0, commandIsPayed ? 4 : 5).map(({ text, prop }) => (
              <Th key={`products-list-header${prop}`}>
                <Flex align="center" gap={2}>
                  {text}
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
          {products?.length > 0 &&
            products?.map(
              ({
                _id,
                name,
                amount,
                unitPrice,
                category,
                totalPayed,
              }: Product) => (
                <Tr key={`product-list${name}`} h={20}>
                  <Td>{name}</Td>
                  <Td>
                    <Flex gap={[2, 4]} align="center">
                      {/* Form to edit tha amount of fish products */}
                      {fishIdToEditAmount === _id ? (
                        <FormControl
                          as="form"
                          onSubmit={(e) =>
                            handleUpdateProductAmount(e, {
                              productId: _id,
                              isFish: isFishingCategory(category),
                            })
                          }
                          w="auto"
                        >
                          <Input
                            value={newProductAmount}
                            onChange={(e) =>
                              setNewProductAmount(e.target.value)
                            }
                            ref={editAmountInputRef}
                            autoFocus
                          />
                        </FormControl>
                      ) : (
                        <>
                          {!commandIsPayed && !isFishingCategory(category) && (
                            <Icon
                              as={AiOutlineMinusCircle}
                              onClick={() =>
                                handleDecrementProductAmount({
                                  _id,
                                  amount,
                                  unitPrice,
                                  totalPayed: Number(totalPayed) as number,
                                })
                              }
                              cursor="pointer"
                            />
                          )}
                          <Text
                            onClick={() => {
                              if (!commandIsPayed) {
                                handleActiveEditFishAmount({
                                  productId: _id,
                                  amount: amount.toString(),
                                });
                              }
                            }}
                          >
                            {isFishingCategory(category)
                              ? `${formatAmount({
                                  num: amount.toString(),
                                  to: 'comma',
                                })} Kg`
                              : amount}
                          </Text>
                          {!commandIsPayed && !isFishingCategory(category) && (
                            <Icon
                              as={AiOutlinePlusCircle}
                              onClick={() =>
                                handleIncrementProductAmount({
                                  productId: _id,
                                  amount,
                                })
                              }
                              cursor="pointer"
                            />
                          )}
                        </>
                      )}
                    </Flex>
                  </Td>
                  <Td>{parseToBRL(unitPrice || 0)}</Td>
                  <Td>{parseToBRL(Number((amount * unitPrice).toFixed(2)))}</Td>
                  {!commandIsPayed && <Td>{parseToBRL(totalPayed || 0)}</Td>}

                  <Td isNumeric>
                    {!commandIsPayed && (
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
                          />
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            icon={<IoCashOutline fontSize={14} />}
                            onClick={() =>
                              handleOpenPayProductModal({
                                _id,
                                name,
                                amount,
                                unitPrice,
                                category,
                                totalPayed,
                              })
                            }
                            display="flex"
                            alignItems="center"
                          >
                            <Text>Pagar Produto</Text>
                          </MenuItem>
                          <MenuItem
                            icon={<BsFillTrashFill fontSize={14} />}
                            onClick={() =>
                              handleOpenDeleteModal({ productId: _id })
                            }
                            color="red.500"
                            display="flex"
                            alignItems="center"
                          >
                            <Text>Deletar</Text>
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    )}
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
                    Nenhum produto encontrado
                  </Text>
                </Flex>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
