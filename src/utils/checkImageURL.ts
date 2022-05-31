export const checkImageURL = (str: string) => {
  const regex = /http(s)?.+\..+/;

  const isValid = str.length > 0 ? regex.test(str) : true;

  return isValid;
};
