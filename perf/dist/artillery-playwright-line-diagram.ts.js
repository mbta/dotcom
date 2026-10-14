var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// perf/artillery-playwright-line-diagram.ts
var artillery_playwright_line_diagram_exports = {};
__export(artillery_playwright_line_diagram_exports, {
  config: () => config,
  scenarios: () => scenarios
});
module.exports = __toCommonJS(artillery_playwright_line_diagram_exports);
var import_promises = require("node:fs/promises");
var baseURL = process.env.HOST ? `https://${process.env.HOST}` : "http://localhost:4001";
var TEST_ROUTES = ["Green", "230", "CR-Franklin", "Boat-F2H"];
var REPS = process.env.REPS ? Number(process.env.REPS) : 10;
var SPLUNK_TOKEN = process.env.SPLUNK_TOKEN;
var VERSION = process.env.OLD_NEW == "new" ? "_new" : "";
var config = {
  target: baseURL,
  engines: {
    playwright: {
      trace: false
    }
  },
  phases: [
    {
      duration: "2m",
      arrivalRate: 1
    },
    {
      duration: "2m",
      arrivalRate: 2
    }
  ]
};
var scenarios = [
  ...TEST_ROUTES.map(
    (route) => ({
      engine: "playwright",
      testFunction: (page) => lineTests(page, route, VERSION)
    })
  )
];
async function lineScenario({ page, baseURL: baseURL2, route, newVersion = false }) {
  await page.goto(`${baseURL2}/schedules/${route}/line${newVersion ? "_new" : ""}`);
  await page.waitForLoadState("load");
  let avg_ttfb = 0;
  let avg_dom = 0;
  let avg_full = 0;
  for (let n = 0; n < REPS; n += 1) {
    await page.reload();
    const { ttfb, dom, full } = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0];
      return {
        ttfb: nav.responseStart - nav.requestStart,
        dom: nav.domContentLoadedEventEnd,
        full: nav.loadEventEnd
      };
    });
    avg_ttfb += ttfb;
    avg_dom += dom;
    avg_full += full;
  }
  avg_ttfb = Math.round(avg_ttfb / REPS);
  avg_dom = Math.round(avg_dom / REPS);
  avg_full = Math.round(avg_full / REPS);
  await report_result({ route, newVersion, ttfb: avg_ttfb, dom: avg_dom, full: avg_full, baseURL: baseURL2, REPS, tag: "line-diagram-performance" });
}
async function report_result({ route, newVersion, ttfb, dom, full, baseURL: baseURL2, REPS: REPS2, tag }) {
  try {
    await (0, import_promises.appendFile)(
      "./perf-results/perf_line-diagram.results_log",
      ",\n" + JSON.stringify({
        timestamp: Date.now(),
        route,
        newVersion,
        results: { ttfb, dom, full },
        host: baseURL2,
        samples: REPS2,
        tag
      })
    );
  } catch (e) {
    console.error(`File error: ${e}`);
  }
}
async function lineTests(page, route, newVersion) {
  await lineScenario({ page, baseURL, route, newVersion });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config,
  scenarios
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vYXJ0aWxsZXJ5LXBsYXl3cmlnaHQtbGluZS1kaWFncmFtLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyB0eXBlIENvbmZpZywgdHlwZSBTY2VuYXJpbyB9IGZyb20gJ2FydGlsbGVyeSc7XG5pbXBvcnQgeyBhcHBlbmRGaWxlIH0gZnJvbSAnbm9kZTpmcy9wcm9taXNlcyc7XG5cbmNvbnN0IGJhc2VVUkwgPSBwcm9jZXNzLmVudi5IT1NUXG4gID8gYGh0dHBzOi8vJHtwcm9jZXNzLmVudi5IT1NUfWBcbiAgOiBcImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMVwiO1xuY29uc3QgVEVTVF9ST1VURVMgPSBbXCJHcmVlblwiLCBcIjIzMFwiLCBcIkNSLUZyYW5rbGluXCIsIFwiQm9hdC1GMkhcIl1cblxuY29uc3QgUkVQUyA9IHByb2Nlc3MuZW52LlJFUFMgPyBOdW1iZXIocHJvY2Vzcy5lbnYuUkVQUykgOiAxMDtcblxuY29uc3QgU1BMVU5LX1VSTCA9IFwiaHR0cHM6Ly9odHRwLWlucHV0cy1tYnRhLnNwbHVua2Nsb3VkLmNvbS9zZXJ2aWNlcy9jb2xsZWN0b3JcIjtcbmNvbnN0IFNQTFVOS19JTkRFWF9OQU1FID0gXCJkb3Rjb20tdGVzdC1tZXRyaWNzXCJcbmNvbnN0IFNQTFVOS19UT0tFTl9OQU1FID0gU1BMVU5LX0lOREVYX05BTUU7XG5jb25zdCBTUExVTktfVE9LRU4gPSBwcm9jZXNzLmVudi5TUExVTktfVE9LRU47XG5cbmNvbnN0IFZFUlNJT04gPSBwcm9jZXNzLmVudi5PTERfTkVXPT1cIm5ld1wiID8gXCJfbmV3XCIgOiBcIlwiXG5cbmV4cG9ydCBjb25zdCBjb25maWc6IENvbmZpZyA9IHtcbiAgICB0YXJnZXQ6IGJhc2VVUkwsXG4gICAgZW5naW5lczoge1xuICAgICAgcGxheXdyaWdodDoge1xuICAgICAgIHRyYWNlOiBmYWxzZVxuICAgICAgfVxuICAgIH0sXG4gICAgcGhhc2VzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBcIjJtXCIsXG4gICAgICAgICAgICBhcnJpdmFsUmF0ZTogMSxcbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBkdXJhdGlvbjogXCIybVwiLFxuICAgICAgICAgICAgYXJyaXZhbFJhdGU6IDIsXG4gICAgICAgIH1cbiAgICBdIFxuXG4gICAgXG59O1xuXG5leHBvcnQgY29uc3Qgc2NlbmFyaW9zOiBTY2VuYXJpb1tdICA9IFtcbiAgICAuLi4oVEVTVF9ST1VURVMubWFwKHJvdXRlID0+ICh7XG4gICAgICAgICAgICBlbmdpbmU6ICdwbGF5d3JpZ2h0JyxcbiAgICAgICAgICAgIHRlc3RGdW5jdGlvbjogKHBhZ2UpID0+IGxpbmVUZXN0cyhwYWdlLCByb3V0ZSwgVkVSU0lPTilcbiAgICAgICAgfSlcbiAgICApKSxcbiAgICBcbiAgIFxuICAgIF07XG5cbmFzeW5jIGZ1bmN0aW9uIGxpbmVTY2VuYXJpbyh7IHBhZ2UsIGJhc2VVUkwsIHJvdXRlLCBuZXdWZXJzaW9uID0gZmFsc2V9KSB7XG4gIGF3YWl0IHBhZ2UuZ290byhgJHtiYXNlVVJMfS9zY2hlZHVsZXMvJHtyb3V0ZX0vbGluZSR7bmV3VmVyc2lvbiA/IFwiX25ld1wiIDogXCJcIn1gKTtcbiAgYXdhaXQgcGFnZS53YWl0Rm9yTG9hZFN0YXRlKCdsb2FkJyk7XG4gIGxldCBhdmdfdHRmYiA9IDA7IFxuICBsZXQgYXZnX2RvbSA9IDA7XG4gIGxldCBhdmdfZnVsbCA9IDA7XG4gIGZvcihsZXQgbj0wO248UkVQUztuKz0xKXtcbiAgICAgICAgYXdhaXQgcGFnZS5yZWxvYWQoKTtcbiAgICAgICAgY29uc3Qge3R0ZmIsIGRvbSwgZnVsbH0gPSBhd2FpdCBwYWdlLmV2YWx1YXRlKCgpPT57XG4gICAgICAgICAgICBjb25zdCBuYXYgPSBwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKCduYXZpZ2F0aW9uJylbMF07XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR0ZmI6IG5hdi5yZXNwb25zZVN0YXJ0IC0gbmF2LnJlcXVlc3RTdGFydCxcbiAgICAgICAgICAgICAgICBkb206IG5hdi5kb21Db250ZW50TG9hZGVkRXZlbnRFbmQsXG4gICAgICAgICAgICAgICAgZnVsbDogbmF2LmxvYWRFdmVudEVuZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pXG4gICAgICAgIGF2Z190dGZiICs9IHR0ZmI7XG4gICAgICAgIGF2Z19kb20gKz0gZG9tO1xuICAgICAgICBhdmdfZnVsbCArPSBmdWxsO1xuICAgIH1cblxuICAgIGF2Z190dGZiID0gTWF0aC5yb3VuZChhdmdfdHRmYi9SRVBTKTtcbiAgICBhdmdfZG9tID0gTWF0aC5yb3VuZChhdmdfZG9tL1JFUFMpO1xuICAgIGF2Z19mdWxsID0gTWF0aC5yb3VuZChhdmdfZnVsbC9SRVBTKTtcbiAgICBhd2FpdCByZXBvcnRfcmVzdWx0KHtyb3V0ZSwgbmV3VmVyc2lvbiwgdHRmYjogYXZnX3R0ZmIsIGRvbTogYXZnX2RvbSwgZnVsbDogYXZnX2Z1bGwsIGJhc2VVUkwsIFJFUFMsIHRhZzogXCJsaW5lLWRpYWdyYW0tcGVyZm9ybWFuY2VcIn0pXG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlcG9ydF9yZXN1bHQoe3JvdXRlLCBuZXdWZXJzaW9uLCB0dGZiLCBkb20sIGZ1bGwsIGJhc2VVUkwsIFJFUFMsIHRhZ30pe1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGFwcGVuZEZpbGUoXG4gICAgICAgICAgICBcIi4vcGVyZi1yZXN1bHRzL3BlcmZfbGluZS1kaWFncmFtLnJlc3VsdHNfbG9nXCIsXG4gICAgICAgICAgICAgXCIsXFxuXCIgKyBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgIHJvdXRlLCBcbiAgICAgICAgICAgICAgICBuZXdWZXJzaW9uLCBcbiAgICAgICAgICAgICAgICByZXN1bHRzOiB7dHRmYiwgZG9tLCBmdWxsfSwgXG4gICAgICAgICAgICAgICAgaG9zdDogIGJhc2VVUkwsIFxuICAgICAgICAgICAgICAgIHNhbXBsZXM6IFJFUFMsIFxuICAgICAgICAgICAgICAgIHRhZ30pXG4gICAgICAgICAgICApXG4gICAgfWNhdGNoKGUpe1xuICAgICAgICBjb25zb2xlLmVycm9yKGBGaWxlIGVycm9yOiAke2V9YCk7XG4gICAgfVxuXG4gICAgLy9JZiB3ZSBmaWd1cmUgdGhlIHNwbHVuayBjcmVkZW50aWFscyBvdXQsIHVuY29tbWVudCB0aGlzXG4gICAvKiBhd2FpdCBmZXRjaChTUExVTktfVVJMLCB7XG4gICAgICAgIGhlYWRlcnM6IHtcIkF1dGhvcml6YXRpb25cIjogYFNwbHVuayAke1NQTFVOS19UT0tFTn1gfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe3RpbWVzdGFtcDogRGF0ZS5ub3coKSwgcm91dGUsIG5ld1ZlcnNpb24sIHR0ZmIsIGRvbSwgZnVsbCwgYmFzZVVSTCwgUkVQUywgdGFnfSksXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCJcbiAgICB9KS50aGVuKHJlc3BvbnNlPT5yZXNwb25zZS50ZXh0KCkpLnRoZW4odGV4dCA9PiBjb25zb2xlLmxvZyh0ZXh0KSk7Ki9cblxufVxuXG5hc3luYyBmdW5jdGlvbiBsaW5lVGVzdHMocGFnZSwgcm91dGUsIG5ld1ZlcnNpb24pIHtcbiAgICBhd2FpdCBsaW5lU2NlbmFyaW8oe3BhZ2UsIGJhc2VVUkwsIHJvdXRlOiByb3V0ZSwgbmV3VmVyc2lvbn0pXG5cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQSxzQkFBMkI7QUFFM0IsSUFBTSxVQUFVLFFBQVEsSUFBSSxPQUN4QixXQUFXLFFBQVEsSUFBSSxJQUFJLEtBQzNCO0FBQ0osSUFBTSxjQUFjLENBQUMsU0FBUyxPQUFPLGVBQWUsVUFBVTtBQUU5RCxJQUFNLE9BQU8sUUFBUSxJQUFJLE9B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
