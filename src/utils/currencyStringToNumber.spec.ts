import { currencyStringToNumber } from "./currencyStringToNumber";

describe("currencyStringToNumber", () => {
  it("Should be able to convert a currency string to number", () => {
    const currencyString = "R$1.721,37";

    expect(currencyStringToNumber(currencyString)).toEqual(1721.37);
  });

  it("Should be able to convert a currency string without dots", () => {
    const currencyString = "R$1721,37";

    expect(currencyStringToNumber(currencyString)).toEqual(1721.37);
  });

  it("Should be able to return the input if it's already a number", () => {
    const value = 1721.37;

    expect(currencyStringToNumber(value)).toEqual(1721.37);
  });

  it("Should be able to convert a currency string with no cents", () => {
    const currencyString = "R$1.721";

    expect(currencyStringToNumber(currencyString)).toEqual(1721);
  });

  it("Should be able to convert a currency string with spaces around the value", () => {
    const currencyString = " R$ 1.721,37 ";

    expect(currencyStringToNumber(currencyString.trim())).toEqual(1721.37);
  });

  it("Should be able to convert a currency string with no thousands separator", () => {
    const currencyString = "R$1721";

    expect(currencyStringToNumber(currencyString)).toEqual(1721);
  });
});
