import { parseQuery } from "../query";

describe("parseQuery", () => {
  it("parses a string into an object with decoded values", () => {
    const query = parseQuery(
      "?spaces=space%20space" +
        "&pluses=plus+plus" +
        "&brackets=%5Bbrackets%5D" +
        "&commas=comma%2Ccomma",
      window.decodeURIComponent
    );
    expect(query).toEqual({
      spaces: "space space",
      pluses: "plus plus",
      brackets: "[brackets]",
      commas: "comma,comma"
    });
  });

  it("should return an empty object if there is no query", () => {
    expect(parseQuery(null as any, window.decodeURIComponent)).toEqual({});
  });
});
