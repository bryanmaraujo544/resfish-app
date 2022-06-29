export const formatPaymentTypes = (paymentTypes: string[]) =>
  paymentTypes.filter(Boolean).join(', ');
