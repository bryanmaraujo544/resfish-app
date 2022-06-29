import { Command } from 'types/Command';

export interface Payment {
  _id: string;
  totalPayed: number;
  paymentTypes: string[];
  createdAt: string;
  command: Command;
  waiterExtra?: number;
  observation?: string;
}
