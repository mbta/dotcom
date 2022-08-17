import { parseQuery, paramsToString } from "../query";

describe("parseQuery", () => {
  it("parses a string into an object with decoded values", () => {
    const query = parseQuery(
      "?spaces=space%20space" +
        "&pluses=plus+plus" +
        "&brackets=%5Bbrackets%5D" +
        "&commas=comma%2Ccomma"
    );
    expect(query).toEqual({
      spaces: "space space",
      pluses: "plus plus",
      brackets: "[brackets]",
      commas: "comma,comma"
    });
  });
});

describe("paramsToString", () => {
  it("turns query into an encoded string", () => {
    const query = paramsToString({
      spaces: "value with spaces",
      brackets: "[brackets]",
      commas: "comma,comma"
    });
    expect(query).toEqual(
      "?spaces=value+with+spaces" +
        "&brackets=%5Bbrackets%5D" +
        "&commas=comma%2Ccomma"
    );
  });
});
