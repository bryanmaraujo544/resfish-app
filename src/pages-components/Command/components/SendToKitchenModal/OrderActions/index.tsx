import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  useToast,
  Stack,
} from '@chakra-ui/react';
import { Modal } from 'components/Modal';
import KitchenService from 'pages-components/Command/services/KitchenService';
import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import { Order as OrderProps } from 'types/Order';
import { OrderProduct } from 'types/OrderProduct';
import { OrderActionsLayout } from './layout';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  kitchenOrder: OrderProps;
}

export const OrderActions = ({
  isModalOpen,
  setIsModalOpen,
  kitchenOrder,
}: Props) => {
  const amountToShip = useRef(0);
  const [productToShip, setProductToShip] = useState<OrderProduct>(
    {} as OrderProduct
  );
  const [productsToShipNow, setProductsToShipNow] = useState<OrderProduct[]>(
    []
  );

  const [isSelectAmountToShipModalOpen, setIsSelectAmountToShipModalOpen] =
    useState(false);

  const toast = useToast();
  const selectAmountRef = useRef(null);

  function handleCloseModal() {
    setIsModalOpen(false);
    setProductsToShipNow([]);
    setProductToShip({} as OrderProduct);
  }

  function handleCloseSelectAmountModal() {
    setIsSelectAmountToShipModalOpen(false);
    // amountToShip.current = 0;
    setProductToShip({} as OrderProduct);
  }

  const handleSelectAmountToShip = useCallback((product: OrderProduct) => {
    setIsSelectAmountToShipModalOpen(true);
    setProductToShip(product);
  }, []);

  const handleShipProduct = useCallback(async () => {
    try {
      const hasSameProduct = productsToShipNow.some(
        ({ _id }) => _id === productToShip._id
      );
      if (hasSameProduct) {
        const newProducts = productsToShipNow.map((product) => {
          if (product._id === productToShip._id) {
            const newAmount = product.amount + amountToShip.current;
            const productSendedToKitchen = kitchenOrder.products.find(
              ({ _id }) => _id === product._id
            );

            if (newAmount > (productSendedToKitchen?.amount as number)) {
              toast.closeAll();
              toast({
                status: 'warning',
                title: 'Quantidade inválida',
                duration: 1000,
              });
              return product;
            }
            (async () => {
              await KitchenService.diminishOrderProductAmount({
                orderId: kitchenOrder._id,
                productId: productToShip._id,
                amount: amountToShip.current,
              });

              // Grab the total of amount already sended to kitchen
              const commandOrdersProducts =
                await KitchenService.getCommandOrdersProducts({
                  commandId: kitchenOrder?.commandId as string,
                });

              const productTotalAmountSendedToKitchen =
                commandOrdersProducts.find(
                  ({ _id }: any) => _id === productToShip._id
                )?.amount;

              await KitchenService.storeKitchenOrder({
                commandId: kitchenOrder?.commandId as string,
                products: [
                  {
                    ...productToShip,
                    amount:
                      productTotalAmountSendedToKitchen + amountToShip.current,
                  },
                ],
                table: kitchenOrder?.table,
                waiter: kitchenOrder?.waiter,
                observation: '',
                isMade: true,
              });
              toast({
                status: 'success',
                title: 'Pedido marcado para entregar agora.',
                duration: 1000,
              });
            })();

            return { ...product, amount: newAmount };
          }
          return product;
        });
        setProductsToShipNow(newProducts);
      } else {
        (async () => {
          await KitchenService.diminishOrderProductAmount({
            orderId: kitchenOrder._id,
            productId: productToShip._id,
            amount: amountToShip.current,
          });

          // Grab the total of amount already sended to kitchen
          const commandOrdersProducts =
            await KitchenService.getCommandOrdersProducts({
              commandId: kitchenOrder?.commandId as string,
            });

          const productTotalAmountSendedToKitchen = commandOrdersProducts.find(
            ({ _id }: any) => _id === productToShip._id
          )?.amount;

          await KitchenService.storeKitchenOrder({
            commandId: kitchenOrder?.commandId as string,
            products: [
              {
                ...productToShip,
                amount:
                  productTotalAmountSendedToKitchen + amountToShip.current,
              },
            ],
            table: kitchenOrder?.table,
            waiter: kitchenOrder?.waiter,
            observation: '',
            isMade: true,
          });
          toast({
            status: 'success',
            title: 'Pedido marcado para entregar agora.',
            duration: 2000,
          });
        })();
        setProductsToShipNow((prev) => [
          ...prev,
          { ...productToShip, amount: amountToShip.current },
        ]);
      }
      handleCloseSelectAmountModal();
    } catch (error: any) {
      toast({
        status: 'error',
        title: error?.response?.data?.message,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountToShip, productToShip, kitchenOrder]);

  return (
    <>
      <OrderActionsLayout
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        kitchenOrderSended={kitchenOrder}
        handleSelectAmountToShip={handleSelectAmountToShip}
        productsToShipNow={productsToShipNow}
      />
      <Modal
        isOpen={isSelectAmountToShipModalOpen}
        onClose={handleCloseSelectAmountModal}
        title="Quantidade para entregar agora"
        initialFocusRef={selectAmountRef}
      >
        <Stack gap={2}>
          <NumberInput
            defaultValue={0}
            min={0}
            max={productToShip?.amount}
            onChange={(amountStr) => {
              amountToShip.current = Number(amountStr);
            }}
          >
            <NumberInputField ref={selectAmountRef} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button onClick={() => handleShipProduct()}>Entregar agora</Button>
        </Stack>
      </Modal>
    </>
  );
};
