/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import { useState } from 'react';
import {
  Flex,
  Button,
  Text,
  Icon,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
} from '@chakra-ui/react';
import { AiFillFilter } from 'react-icons/ai';
import { BiSearchAlt2 } from 'react-icons/bi';
import { CgSortAz } from 'react-icons/cg';

const sortOptions = [
  { text: 'Imagem', prop: 'image' },
  { text: 'Nome', prop: 'name' },
  { text: 'Categoria', prop: 'category' },
  { text: 'Preço unid.', prop: 'unitPrice' },
  { text: 'Qntd', prop: 'amount' },
];

const filterOptions = [
  'Pesca',
  'Peixes',
  'Bebidas',
  'Pratos',
  'Sobremesas',
  'Porções',
  'Doses',
];

interface CheckIsMenuItemChecked {
  menu: 'sort' | 'filter';
  item: string;
}

type Props = {
  filters: string;
  orderBy: string;
  handleSetFilter: any;
  handleSetOrderBy: any;
  searchContent: string;
  handleSearchItems: any;
};

export const NavHeaderLayout = ({
  filters,
  orderBy,
  handleSetFilter,
  handleSetOrderBy,
  searchContent,
  handleSearchItems,
}: Props) => {
  const [whichMenuIsOpened, setWhichMenuIsOpened] = useState<
    'filter' | 'sort' | ''
  >('');

  function handleToggleFilterMenu() {
    setWhichMenuIsOpened((prevState) =>
      prevState === 'filter' ? '' : 'filter'
    );
  }

  function handleToggleSortMenu() {
    setWhichMenuIsOpened((prevState) => (prevState === 'sort' ? '' : 'sort'));
  }

  function checkIsMenuItemChecked({ menu, item }: CheckIsMenuItemChecked) {
    if (menu === 'filter') {
      return item === filters;
    }

    return item === orderBy;
  }

  return (
    <Flex mb={8} w="100%">
      <Flex
        mb={8}
        w="100%"
        justify="space-between"
        gap={4}
        height={['auto', '32', 14]}
        flexWrap={['wrap', 'wrap', 'nowrap']}
        display={['grid', 'grid', 'flex']}
        gridTemplateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', null]}
      >
        {/* Filtering Container */}
        <MenuBtnContainer>
          <MenuBtn onClick={() => handleToggleFilterMenu()}>
            <Icon as={AiFillFilter} fontSize={[12, 16, 18]} />
            Filtrar
            {filters.length > 0 && <Circle />}
          </MenuBtn>
          {whichMenuIsOpened === 'filter' && (
            <MenuItemsContainer>
              {filterOptions.map((text) => (
                <ItemContainer
                  key={`filter-${text}`}
                  onClick={() => handleSetFilter(text)}
                  bg={
                    checkIsMenuItemChecked({ menu: 'filter', item: text })
                      ? 'blue.300'
                      : 'none'
                  }
                  color={
                    checkIsMenuItemChecked({ menu: 'filter', item: text })
                      ? 'blue.50'
                      : 'blue.900'
                  }
                >
                  {text}
                </ItemContainer>
              ))}
            </MenuItemsContainer>
          )}
        </MenuBtnContainer>

        {/* Sort Button */}
        <MenuBtnContainer>
          <MenuBtn onClick={() => handleToggleSortMenu()} oi="oi">
            <Icon as={CgSortAz} fontSize={[16, 20, 24]} />
            Ordenar
            {orderBy && <Circle />}
          </MenuBtn>
          {whichMenuIsOpened === 'sort' && (
            <MenuItemsContainer>
              {sortOptions.map(({ text, prop }) => (
                <ItemContainer
                  key={`sort#${prop}`}
                  onClick={() => handleSetOrderBy(prop)}
                  bg={
                    checkIsMenuItemChecked({ menu: 'sort', item: prop })
                      ? 'blue.300'
                      : 'none'
                  }
                  color={
                    checkIsMenuItemChecked({ menu: 'sort', item: prop })
                      ? 'blue.50'
                      : 'blue.900'
                  }
                >
                  {text}
                </ItemContainer>
              ))}
            </MenuItemsContainer>
          )}
        </MenuBtnContainer>
        <InputGroup
          boxSizing="border-box"
          gridColumnStart="1"
          gridColumnEnd="3"
          h={[14, 14, '100%']}
        >
          <InputLeftElement
            pointerEvents="none"
            h="100%"
            children={
              <Icon
                as={BiSearchAlt2}
                color="blue.800"
                fontSize={[16, 18, 24]}
              />
            }
          />
          <Input
            value={searchContent}
            onChange={(e) => handleSearchItems(e)}
            variant="filled"
            placeholder="Pesquise por um item"
            fontWeight={600}
            fontSize={18}
            color="blue.800"
            bg="blue.50"
            boxShadow="base"
            h="100%"
            _hover={{
              bg: 'blue.100',
            }}
            _focus={{
              bg: 'blue.50',
              border: '2px',
              borderColor: 'blue.400',
            }}
          />
        </InputGroup>
      </Flex>
    </Flex>
  );
};

const MenuBtnContainer = (props: any) => (
  <Flex
    {...props}
    direction="column"
    w={['auto', 'auto', 200]}
    flex={[1, 1, 'auto']}
    h={[12, 12, '100%']}
    position="relative"
  >
    {props.children}
  </Flex>
);

const MenuBtn = (props: any) => (
  <Button
    {...props}
    display="flex"
    alignItems="center"
    width="100%"
    h="100%"
    bg="blue.50"
    gap={2}
    boxShadow="base"
    color="blue.800"
    fontWeight={600}
    _hover={{
      bg: 'blue.100',
    }}
    _active={{
      bg: 'blue.50',
    }}
  >
    {props.children}
  </Button>
);

const MenuItemsContainer = (props: any) => (
  <Flex
    {...props}
    position="absolute"
    direction="column"
    gap={0.5}
    top="100%"
    width="100%"
    bg="blue.50"
    rounded="md"
    boxShadow="base"
    color="blue.800"
    mt={4}
    p={2}
    zIndex={100}
  >
    {props.children}
  </Flex>
);

const ItemContainer = (props: any) => (
  <>
    <Text
      {...props}
      p={1.5}
      rounded="md"
      fontWeight={600}
      cursor="pointer"
      _hover={{
        bg: 'blue.100',
      }}
    >
      {props.children}
    </Text>
    <Divider />
  </>
);

const Circle = () => <Box w={2} h={2} rounded={2} bg="blue.400" mt={1} />;
