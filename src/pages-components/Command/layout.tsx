/* eslint-disable react/destructuring-assignment */
import { Heading, Spinner, Flex } from '@chakra-ui/react';
import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import { Command } from 'types/Command';
import { formatDecimalNum } from 'utils/formatDecimalNum';
import { NavHeader } from './components/NavHeader';
import { ProductsList } from './components/ProductsList';

interface Props {
  command: Command;
  isLoading: boolean;
  handleGoToCommands?: () => void;
}

export const CommandLayout = ({
  command,
  isLoading,
  handleGoToCommands,
}: Props) => (
  <Layout>
    <Header hasBackPageBtn handleBackPage={handleGoToCommands} />
    {isLoading ? (
      <Spinner
        size="xl"
        position="absolute"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
      />
    ) : (
      <>
        <Flex justify="space-between" mb={4}>
          <BgBox>
            <Heading fontSize={[16, 20, 22]}>Comanda: {command?.table}</Heading>
          </BgBox>
          <BgBox>
            <Heading fontSize={[16, 20, 22]}>
              Total: R${' '}
              {formatDecimalNum({
                num: command?.total?.toString() || '0',
                to: 'comma',
              })}
            </Heading>
          </BgBox>
        </Flex>
        <NavHeader />
        <ProductsList />
      </>
    )}
  </Layout>
);

const BgBox = (props: any) => (
  <Flex
    align="center"
    boxShadow="sm"
    bg="blue.50"
    color="blue.700"
    px={4}
    py={2}
    rounded={4}
    {...props}
  >
    {props.children}
  </Flex>
);
