export const currencyToNumber = (priceString: string): number =>
    parseFloat(priceString.replace(/[$, ]/g, ""));
