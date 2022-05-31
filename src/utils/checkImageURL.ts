export const checkImageURL = (str: string) => {
  const regex = /http(s)?.+\..+/;

  return regex.test(str);
};
