/**
 * Replaces slashes in a given string with a slash + ZERO_WIDTH_SPACE.
 * It's visually the same, but allows browsers to break the text into multiple lines.
 */
// eslint-disable-next-line import/prefer-default-export
export const breakTextAtSlash = (str: string): string =>
  str.replace(/\//g, "/​");
