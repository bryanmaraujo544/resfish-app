import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  title: string;
  isOpen: boolean;
  onClose: any;
  children: ReactNode;
  initialFocusRef: any;
  size?: string;
  modalBodyOverflow?: any;
}

export const ModalLayout = ({
  title,
  isOpen,
  onClose,
  size,
  initialFocusRef,
  children,
  modalBodyOverflow,
}: Props) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    isCentered
    size={size || 'lg'}
    initialFocusRef={initialFocusRef}
    scrollBehavior="inside"
  >
    <ModalOverlay
      bg="blackAlpha.500"
      backdropFilter="blur(3px)"
      overflowY="scroll"
    />
    <ModalContent py={2} mx={2}>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody
        display="flex"
        flexDir="column"
        overflowY={modalBodyOverflow || 'scroll'}
      >
        {children}
      </ModalBody>
    </ModalContent>
  </Modal>
);
