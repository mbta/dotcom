import { breakTextAtSlash } from "../text";

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
