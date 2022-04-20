/**
 * Replaces slashes in a given string with a slash + ZERO_WIDTH_SPACE.
 * It's visually the same, but allows browsers to break the text into multiple lines.
 */
// eslint-disable-next-line import/prefer-default-export
export const breakTextAtSlash = (str: string): string =>
  str.replace(/\//g, "/​");

interface HighlightedSpan {
  offset: number;
  length: number;
}
export function highlightText(
  text: string,
  spans: HighlightedSpan[] = []
): string {
  const parts = [];
  let cursor = 0;
  spans.forEach(span => {
    const { offset, length } = span;

    parts.push(text.slice(cursor, offset));
    parts.push(`<em>${text.slice(offset, offset + length)}</em>`);
    cursor = length + offset;
  });
  parts.push(text.slice(cursor));

  return parts.join("");
}
