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
}

export const ModalLayout = ({ title, isOpen, onClose, children }: Props) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
    <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(3px)" />
    <ModalContent py={2} mx={2}>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{children}</ModalBody>
    </ModalContent>
  </Modal>
);
