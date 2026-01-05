
export const currency = (value, locale = "en-US", currencyType = "USD") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyType,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};


export const numberWithCommas = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
