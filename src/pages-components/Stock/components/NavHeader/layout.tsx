import { useState } from 'react';
import { Flex, Button, Text } from '@chakra-ui/react';

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

  return (
    <Flex mb={8} w="100%">
      <Flex mb={2} w="100%" justify="space-between" position="relative">
        {/* Filtering Container */}
        <Flex direction="column">
          <Button onClick={() => handleToggleFilterMenu()}>Filtrar</Button>
          {whichMenuIsOpened === 'filter' && (
            <Flex
              direction="column"
              position="absolute"
              top="100%"
              bg="blue.100"
              rounded="md"
              zIndex={100}
              mt={4}
              p={4}
              gap={2}
            >
              {filtersOptions.map((text) => (
                <Text fontWeight={600}>{text}</Text>
              ))}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
