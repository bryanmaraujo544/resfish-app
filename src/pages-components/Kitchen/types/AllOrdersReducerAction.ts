export interface AllOrdersReducerAction {
  type:
    | 'ADD-ORDERS'
    | 'UPDATE-ONE-PRODUCT'
    | 'CHECK-ONE-PRODUCT'
    | 'REMOVE-ONE-ORDER';
  payload: any;
}
