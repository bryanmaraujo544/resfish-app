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
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent py={2}>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{children}</ModalBody>
    </ModalContent>
  </Modal>
);
