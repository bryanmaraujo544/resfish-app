export const parseToBRL = (num: number) => {
  const numWithComma = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(num));

  return numWithComma;
};
