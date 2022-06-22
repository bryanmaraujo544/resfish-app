import { Command } from 'types/Command';

export interface Payment {
  _id: string;
  totalPayed: number;
  paymentType: string;
  createdAt: string;
  command: Command;
  waiterExtra?: number;
}
