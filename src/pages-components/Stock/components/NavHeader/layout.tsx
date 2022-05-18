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
} from '@chakra-ui/react';
import { AiFillFilter } from 'react-icons/ai';
import { BiSearchAlt2 } from 'react-icons/bi';

const filtersOptions = ['imagem', 'nome', 'preço unid.', 'qntd'];

export const NavHeaderLayout = () => {
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

  return (
    <Flex mb={8} w="100%">
      <Flex mb={8} w="100%" justify="space-between" gap={4} height={14}>
        {/* Filtering Container */}
        <Flex
          direction="column"
          w={[100, 200]}
          position="relative"
          height="100%"
        >
          <Button
            onClick={() => handleToggleFilterMenu()}
            w="100%"
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
            <Icon as={AiFillFilter} fontSize={[12, 16, 18]} />
            Filtrar
          </Button>
          {whichMenuIsOpened === 'filter' && (
            <Flex
              position="absolute"
              direction="column"
              gap={0}
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
              {filtersOptions.map((text) => (
                <>
                  <Text
                    _hover={{
                      bg: 'blue.200',
                    }}
                    cursor="pointer"
                    p={2}
                    rounded="md"
                    fontWeight={600}
                  >
                    {text}
                  </Text>
                  <Divider />
                </>
              ))}
            </Flex>
          )}
        </Flex>

        {/* Sort Button */}
        <Flex direction="column" w={[100, 200]} h="100%" position="relative">
          <Button
            onClick={() => handleToggleSortMenu()}
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
            <Icon as={AiFillFilter} fontSize={[12, 16, 18]} />
            Ordenar
          </Button>
          {whichMenuIsOpened === 'sort' && (
            <Flex
              position="absolute"
              direction="column"
              gap={0}
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
              {filtersOptions.map((text) => (
                <>
                  <Text
                    _hover={{
                      bg: 'blue.200',
                    }}
                    cursor="pointer"
                    p={2}
                    rounded="md"
                    fontWeight={600}
                  >
                    {text}
                  </Text>
                  <Divider />
                </>
              ))}
            </Flex>
          )}
        </Flex>
        <InputGroup boxSizing="border-box">
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
            variant="filled"
            placeholder="Pesquise por um item"
            h="100%"
            fontWeight={600}
            fontSize={18}
            color="blue.800"
            bg="blue.50"
            boxShadow="base"
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
