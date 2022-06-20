/* eslint-disable react/no-children-prop */
import React, { Dispatch, SetStateAction } from 'react';
import {
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Box,
  Input,
  Button,
  Icon,
} from '@chakra-ui/react';
import { AiFillFilter } from 'react-icons/ai';
// import { BiSearchAlt2 } from 'react-icons/bi';
import { BiSortAlt2 } from 'react-icons/bi';
// import { CgSortAz } from 'react-icons/cg';

const filterOptions = ['Pesca Esportiva', 'Pesque Pague'];
const sortOptions = [
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
];

type Props = {
  // eslint-disable-next-line no-unused-vars
  handleChangeFilter: (newFilter: string) => void;
  // eslint-disable-next-line no-unused-vars
  handleChangeOrderBy: (newOrderBy: string) => void;
  filter: string;
  orderBy: string;
  searchContent: string;
  setSearchContent: Dispatch<SetStateAction<string>>;
};

export const NavHeaderLayout = ({
  handleChangeFilter,
  handleChangeOrderBy,
  filter,
  orderBy,
  searchContent,
  setSearchContent,
}: Props) => {
  const isFilterItemSelected = (filterText: string) => {
    const isSelected =
      filterText.replace(' ', '').toLowerCase() ===
      filter.replace(' ', '').toLowerCase();

    return isSelected;
  };

  const isOrderByItemSelected = (orderByText: string) => {
    const isSelected = orderByText.toLowerCase() === orderBy.toLowerCase();

    return isSelected;
  };
  return (
    <Flex direction="column" gap={4} mb={10}>
      <Box
        display={['grid', 'grid', 'flex']}
        gridTemplateColumns="repeat(2, 1fr)"
        gap={[2, 4]}
        justifyContent="space-between"
        flexWrap="wrap"
      >
        {/* Filter Menu */}
        <Menu>
          <MenuButton
            as={Button}
            bg="blue.50"
            color="blue.800"
            fontSize={[12, 14, 16]}
            _hover={{
              bg: 'blue.100',
            }}
            _active={{
              bg: 'blue.300',
              color: 'white',
            }}
            gridColumnStart={1}
            gridColumnEnd={2}
            display="flex"
            gap={2}
          >
            <Flex gap={[1, 1, 2]} alignItems="center" justify="center">
              <Icon as={AiFillFilter} />
              Filtrar por
              {filter && <Square />}
            </Flex>
          </MenuButton>
          <MenuList bg="blue.50" color="blue.900" p={2}>
            {filterOptions.map((filterText) => (
              <React.Fragment key={`commandss-filter-${filterText}`}>
                <MenuItem
                  onClick={() => handleChangeFilter(filterText)}
                  display="flex"
                  flexDir="column"
                  alignItems="flex-start"
                  bg={isFilterItemSelected(filterText) ? 'blue.400' : 'blue.50'}
                  _hover={{
                    bg: 'blue.100',
                  }}
                  rounded={4}
                  _focus={{
                    bg: isFilterItemSelected(filterText)
                      ? 'blue.400'
                      : 'blue.100',
                  }}
                  fontWeight={600}
                >
                  {filterText}
                </MenuItem>
                <Divider />
              </React.Fragment>
            ))}
          </MenuList>
        </Menu>
        {/* Sort Menu */}
        <Menu>
          <MenuButton
            as={Button}
            bg="blue.50"
            color="blue.800"
            fontSize={[12, 14, 16]}
            _hover={{
              bg: 'blue.100',
            }}
            _active={{
              bg: 'blue.300',
              color: 'white',
            }}
            gridColumnStart={2}
            gridColumnEnd={3}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <Flex gap={[1, 1, 2]} align="center" justify="center">
              <Icon as={BiSortAlt2} fontSize={[16, 18]} />
              Ordenar por
              {orderBy && <Square />}
            </Flex>
          </MenuButton>
          <MenuList bg="blue.50" color="blue.900" p={2}>
            {sortOptions.map(({ text, prop }) => (
              <React.Fragment key={`commandss-sort-${prop}`}>
                <MenuItem
                  onClick={() => handleChangeOrderBy(prop)}
                  display="flex"
                  flexDir="column"
                  alignItems="flex-start"
                  bg={isOrderByItemSelected(prop) ? 'blue.400' : 'blue.50'}
                  _hover={{
                    bg: 'blue.100',
                  }}
                  rounded={4}
                  _focus={{
                    bg: isOrderByItemSelected(prop) ? 'blue.400' : 'blue.100',
                  }}
                  fontWeight={600}
                >
                  {text}
                </MenuItem>
                <Divider />
              </React.Fragment>
            ))}
          </MenuList>
        </Menu>
        {/* Search Bar */}
        <Input
          value={searchContent}
          onChange={(e) => setSearchContent(e.target.value)}
          flex={3}
          placeholder="Encontrar comanda..."
          minWidth={64}
          gridColumnStart={1}
          gridColumnEnd={3}
          variant="filled"
          bg="blue.50"
        />
      </Box>
      {filter && (
        <Text fontSize={[12, 14]} color="blue.700">
          Filtrando por:{' '}
          <Text display="inline" fontWeight={600}>
            {filter}
          </Text>
        </Text>
      )}
    </Flex>
  );
};

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
