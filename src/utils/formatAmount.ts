/* eslint-disable no-unsafe-optional-chaining */
interface Props {
  num: string;
  to: 'comma' | 'point';
}

export const formatAmount = ({ num, to }: Props) => {
  if (to === 'comma') {
    const numberWithComma = num?.replace(/\./g, ',');
    const [numberBeforeComma, numberAfterComma] = numberWithComma?.split(',');

    if (numberAfterComma?.length === 1) {
      return `${numberWithComma}00`;
    }

    if (numberAfterComma?.length === 2) {
      return `${numberWithComma}0`;
    }

    if (numberAfterComma?.length > 3) {
      return `${numberBeforeComma},${numberAfterComma?.slice(0, 3)}`;
    }

    return numberWithComma;
  }

  const numWithPoint = Number(num.replace(/,/g, '.'));
  return numWithPoint;
};
