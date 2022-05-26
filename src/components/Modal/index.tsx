/* eslint-disable react/no-children-prop */
import { ReactNode } from 'react';
import { ModalLayout } from './layout';

interface Props {
  title: string;
  isOpen: boolean;
  onClose: any;
  size?: string;
  children: ReactNode;
}

export const Modal = ({ title, isOpen, onClose, children, size }: Props) => (
  <ModalLayout
    title={title}
    isOpen={isOpen}
    onClose={onClose}
    children={children}
    size={size}
  />
);
