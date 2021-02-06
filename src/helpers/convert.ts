export const cvNumToCurrency = (number: number | string) => {
  return number
    .toString()
    .replace(/,/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const cvCurrencyToNum = (value: string) => {
  return parseFloat(value.replace(/,/g, ""));
};

export const cutDecimal = (str: string) => {
  const index = str.indexOf(".");
  if (index !== -1) return str.slice(0, index);
  return str;
};
