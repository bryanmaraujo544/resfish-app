export interface Command {
  _id?: string;
  table?: string;
  waiter?: string;
  fishingType?: string;
  products?: any[];
  total?: number;
  isActive?: boolean;
}
