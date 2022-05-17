import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import Image from 'next/image';
import { NavHeader } from './components/NavHeader';

const stockColumns = ['Image', 'Nome', 'Preço Unid.', 'Qntd'];

const mockProducts = [
  {
    image:
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
    name: 'Pesque-Pague',
    amount: null,
    unitPrice: 0,
    id: Math.random().toFixed(4),
  },
  {
    image:
      'https://user-images.githubusercontent.com/62571814/168487287-6b0c1c98-d2d6-4827-87dd-998048561057.png',
    name: 'Pesca Esportiva',
    amount: null,
    unitPrice: 25.9,
    id: Math.random().toFixed(4),
  },
];

interface Props {
  handleOpenEditModal: any;
}

export const StockLayout = ({ handleOpenEditModal }: Props) => (
  <Layout>
    <Header />
    <NavHeader />
    <Grid templateColumns={`repeat(${stockColumns.length}, auto)`} w="100%">
      <GridItem
        display="grid"
        gridTemplateColumns={`repeat(${stockColumns.length}, 1fr)`}
        colStart={1}
        colEnd={stockColumns.length + 1}
        fontSize="lg"
        fontWeight={700}
        color="blue.900"
        pb={2}
        borderBottom="1px"
        borderColor="gray.200"
      >
        {stockColumns.map((text) => (
          <Text>{text}</Text>
        ))}
      </GridItem>
      {mockProducts.map(({ image, name, amount, unitPrice, id }) => (
        <GridItem
          key={id}
          display="grid"
          gridTemplateColumns={`repeat(${stockColumns.length}, 1fr)`}
          colStart={1}
          colEnd={stockColumns.length + 1}
          gap={2}
          alignItems="center"
          py={4}
          borderBottom="1px"
          borderColor="gray.200"
          color="blue.900"
          onClick={() =>
            handleOpenEditModal({ name, image, id, amount, unitPrice })
          }
        >
          <Flex position="relative" align="center">
            <Image src={image} width={48} height={48} objectFit="cover" />
          </Flex>
          <Text fontWeight={600} fontSize="lg">
            {name}
          </Text>
          <Text fontWeight={600} fontSize="lg">
            R${unitPrice}
          </Text>
          <Text
            fontWeight={600}
            fontSize="lg"
            color={amount === 0 ? 'red.500' : 'blue.900'}
          >
            {amount !== null ? amount : '*'}
          </Text>
        </GridItem>
      ))}
    </Grid>
  </Layout>
);
