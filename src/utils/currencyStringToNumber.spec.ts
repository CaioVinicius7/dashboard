import { currencyStringToNumber } from "./currencyStringToNumber";

describe("currencyStringToNumber", () => {
  it("Should be able to convert a currency string to number", () => {
    const currencyString = "R$1.721,37";

    expect(currencyStringToNumber(currencyString)).toEqual(1721.37);
  });
});
