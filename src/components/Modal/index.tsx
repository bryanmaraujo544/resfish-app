/* eslint-disable react/no-children-prop */
import { ReactNode } from 'react';
import { ModalLayout } from './layout';

interface Props {
  title: string;
  isOpen: boolean;
  onClose: any;
  children: ReactNode;
}

export const Modal = ({ title, isOpen, onClose, children }: Props) => (
  <ModalLayout
    title={title}
    isOpen={isOpen}
    onClose={onClose}
    children={children}
  />
);
