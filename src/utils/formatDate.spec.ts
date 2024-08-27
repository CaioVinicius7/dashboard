import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("Should be able to convert a date string to 'dd/MM/yyyy' format", () => {
    const dateString = "2024-08-27";

    expect(formatDate(dateString)).toBe("27/08/2024");
  });

  it("Should be able to handle a date string with time and still convert to 'dd/MM/yyyy' format", () => {
    const dateTimeString = "2024-08-27T14:48:00.000Z";

    expect(formatDate(dateTimeString)).toBe("27/08/2024");
  });

  it("Should be able to convert a date string for a leap year", () => {
    const leapYearDateString = "2024-02-29";

    expect(formatDate(leapYearDateString)).toBe("29/02/2024");
  });

  it("Should be able to convert an ISO string to 'dd/MM/yyyy' format", () => {
    const isoString = new Date("2024-08-27T15:45:00Z").toISOString();

    expect(formatDate(isoString)).toBe("27/08/2024");
  });

  it("Should be able to convert a different ISO string to 'dd/MM/yyyy' format", () => {
    const isoString = new Date("2024-01-01T03:00:00Z").toISOString();

    expect(formatDate(isoString)).toBe("01/01/2024");
  });
});
