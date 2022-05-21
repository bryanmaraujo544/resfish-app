export const formatPrice = (price: string) => {
  const number = price.split(' ')[1];
  if (!number) return 'R$ ';

  const newStr = number.replace(/^(.*)$/g, 'R$ $1');
  return newStr;
};
