import { formatCurrency } from "./formatCurrency";

describe("formatCurrency", () => {
  it("Should be able to format a positive number correctly", () => {
    const result = formatCurrency(1234.56);
    expect(result).toBe("R$ 1.234,56");
  });

  it("Should be able to format a negative number correctly", () => {
    const result = formatCurrency(-1234.56);
    expect(result).toBe("-R$ 1.234,56");
  });

  it("Should be able to format a number with no decimal places correctly", () => {
    const result = formatCurrency(1234);
    expect(result).toBe("R$ 1.234,00");
  });

  it("Should be able to format zero correctly", () => {
    const result = formatCurrency(0);
    expect(result).toBe("R$ 0,00");
  });

  it("Should be able to format a large number correctly", () => {
    const result = formatCurrency(123456789.99);
    expect(result).toBe("R$ 123.456.789,99");
  });
});
