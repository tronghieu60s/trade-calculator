export const cvNumToCurrency = (number: number | string) => {
    return number
      .toString()
      .replace(/,/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const cvCurrencyToNum = (value: string) => {
  return parseFloat(value.replace(/,/g, ""));
}