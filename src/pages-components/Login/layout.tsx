import { Button, Flex, FormControl, Input } from '@chakra-ui/react';

export const LoginLayout = () => (
  <Flex
    justify="center"
    align="center"
    flexDirection="column"
    gap={8}
    w="100%"
    minHeight="100vh"
    bg="gray.100"
  >
    <FormControl
      as="form"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      gap={4}
      backgroundColor="blue.100"
      width="100%"
      maxWidth="500px"
      p={8}
      rounded={8}
    >
      <Input
        placeholder="Chave De Acesso"
        bg="gray.100"
        fontSize={20}
        h={16}
        fontWeight={600}
      />
      <Button
        type="submit"
        h={16}
        bg="blue.500"
        color="gray.100"
        fontSize={20}
        fontWeight={700}
        _hover={{
          backgroundColor: 'red.400',
        }}
      >
        Acessar
      </Button>
    </FormControl>
  </Flex>
);
