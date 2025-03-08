const { expect, test } = require("@playwright/test");

const baseURL = process.env.HOST
  ? `https://${process.env.HOST}`
  : "http://localhost:4001";

test.use({ baseURL, headless: true, screenshot: "off", video: "off", trace: "off" });

/**
 * One-off test suite to verify that responses come with various
 * security-related headers. This doesn't necessarily verify relevant or
 * correct values, only that the headers are present at all.
 * 
 * This was inspired by a security audit which uncovered some gaps. The
 * particular requests being made in this tests are the same reported in the
 * audit. The particular headers being verified also correspond to the ones
 * from the audit.
 * 
 * This test doesn't need to run regularly, but if adjusting the configuration
 * of returning security headers, running this script offers some peace of
 * mind.
 * 
 * Defaults to running against localhost, but can run against any site using
 * the HOST environment variable, e.g.
 * 
 * HOST=dev.mbtace.com npx playwright test security-headers
 */
test.describe("Security headers are present", () => {
  [
    ["get", "/"],
    ["post", "/"],
    ["get", "/favicon.ico"],
    ["post", "/schedules/742/line"],
    ["get", "/icon-svg/icon-map-station-marker.svg"],
    ["post", "/schedules/36/line"],
  ].forEach(([method, path]) => {
    test(`${method} ${path}`, async ({ request }) => {
      const response = await request[method](path);
      const headers = response.headers();

      // static resources aren't technically required to have all the security
      // headers. do a different check depending on if the response
      // content-type is HTML
      const expectedHeaders = headers['content-type'].includes("text/html") ? [
        "cache-control",
        "content-security-policy",
        "referrer-policy",
        "strict-transport-security",
        "x-content-type-options",
        "x-xss-protection"
      ] : [
        "cache-control",
        "strict-transport-security",
        "x-content-type-options",
        "x-xss-protection"
      ]

      expectedHeaders.forEach(expectedHeader => {
        expect(headers[expectedHeader], `${expectedHeader} should be present`).toBeTruthy();
      });
    });
  });

  test("CORS", async ({ request }) => {
    const response = await request.get("/favicon.ico", { 
      headers: {
        "Origin": "https://other.site"
      } 
    });
    const responseHeaders = response.headers();
    expect(responseHeaders["access-control-allow-origin"]).toBeTruthy()
  });
});
