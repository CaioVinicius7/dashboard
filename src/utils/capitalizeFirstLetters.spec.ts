import { capitalizeFirstLetters } from "./capitalizeFirstLetters";

describe("capitalizeFirstLetters", () => {
  it("Should be able to capitalize first letters of a text", () => {
    const name = "john wick";

    expect(capitalizeFirstLetters(name)).toEqual("John Wick");
  });

  it("Should be able to capitalize first letters of a word with two characters", () => {
    const word = "oi";

    expect(capitalizeFirstLetters(word)).toEqual("oi");
  });
});
