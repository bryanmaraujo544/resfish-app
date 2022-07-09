interface Props {
  num: string;
  to: 'comma' | 'point';
}

export const formatDecimalNum = ({ num, to }: Props) => {
  if (to === 'point') {
    const numWithPoint = num.replace(/,/g, '.');

    const decimal = numWithPoint.split('.')[1];
    if (!decimal) {
      return `${numWithPoint}.00`;
    }
    return numWithPoint;
  }

  const numWithComma = num.replace(/\./g, ',');
  const numberAfterComma = numWithComma.split(',')[1];

  if (!numberAfterComma) {
    return `${numWithComma},00`;
  }

  if (numberAfterComma?.length < 2) {
    return `${numWithComma}0`;
  }

  return numWithComma;

  // return num;
};
