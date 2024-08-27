import { formatPercentage } from "./formatPercentage";

describe("formatPercentage", () => {
  it("Should be able to format a positive value with two decimal places", () => {
    const value = 12.3456;

    expect(formatPercentage(value)).toBe("12.35%");
  });

  it("Should be able to format a negative value with two decimal places and show the negative sign by default", () => {
    const value = -12.3456;

    expect(formatPercentage(value)).toBe("-12.35%");
  });

  it("Should be able to format a negative value without showing the negative sign when showNegative is false", () => {
    const value = -12.3456;

    expect(formatPercentage(value, false)).toBe("12.35%");
  });

  it("Should be able to format a value of zero correctly", () => {
    const value = 0;

    expect(formatPercentage(value)).toBe("0.00%");
  });

  it("Should be able to handle a value with no decimal places", () => {
    const value = 15;

    expect(formatPercentage(value)).toBe("15.00%");
  });
});
