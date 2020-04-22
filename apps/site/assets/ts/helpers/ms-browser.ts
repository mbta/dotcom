/**
 * Browser hack to detect whether user is using Internet Explorer or Edge
 * Intended for use in conditionally enabling features
 */

// We don't support IE < 11, noted in .browserslistrc
export const isUnsupportedIE = (ua: string): boolean =>
  ua.indexOf("MSIE ") > -1;
export const isIE11 = (ua: string): boolean => ua.indexOf("Trident/") > -1;
export const isMSEdge = (ua: string): boolean => ua.indexOf("Edge/") > -1;

export default function isMSBrowser(userAgent?: string): boolean {
  const ua = userAgent || window.navigator.userAgent;
  return isUnsupportedIE(ua) || isIE11(ua) || isMSEdge(ua);
}
