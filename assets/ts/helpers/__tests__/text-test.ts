import { breakTextAtSlash, highlightText } from "../text";

describe("breakTextAtSlash", () => {
  test("doesn't change text without slashes", () => {
    const str = "this text doesn't contain a slash";

    expect(breakTextAtSlash(str)).toEqual(str);
  });

  test("adds zero width spaces after slashes", () => {
    const str = "abc/123/xyz";

    const result = breakTextAtSlash(str);

    expect(result.length).toEqual(13);
    // There are now zero-widt spaces after each slash
    expect(result).toEqual("abc/​123/​xyz");
  });
});

describe("highlightText", () => {
  test("generates proper <em> spans", () => {
    const text = "Sesame Street";
    const spans = [
      { offset: 0, length: 6 },
      { offset: 7, length: 6 }
    ];

    const highlighted = highlightText(text, spans);
    expect(highlighted).toEqual("<em>Sesame</em> <em>Street</em>");

    const notHighlighted = highlightText(text);
    expect(notHighlighted).toEqual("Sesame Street");
  });
});
