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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vYXJ0aWxsZXJ5LXBsYXl3cmlnaHQtbGluZS1kaWFncmFtLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyB0eXBlIENvbmZpZywgdHlwZSBTY2VuYXJpbyB9IGZyb20gJ2FydGlsbGVyeSc7XG5pbXBvcnQgeyBhcHBlbmRGaWxlIH0gZnJvbSAnbm9kZTpmcy9wcm9taXNlcyc7XG5cbmNvbnN0IGJhc2VVUkwgPSBwcm9jZXNzLmVudi5IT1NUXG4gID8gYGh0dHBzOi8vJHtwcm9jZXNzLmVudi5IT1NUfWBcbiAgOiBcImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMVwiO1xuY29uc3QgVEVTVF9ST1VURVMgPSBbXCJHcmVlblwiLCBcIjIzMFwiLCBcIkNSLUZyYW5rbGluXCIsIFwiQm9hdC1GMkhcIl1cblxuY29uc3QgUkVQUyA9IHByb2Nlc3MuZW52LlJFUFMgPyBOdW1iZXIocHJvY2Vzcy5lbnYuUkVQUykgOiAxMDtcblxuY29uc3QgVkVSU0lPTiA9IHByb2Nlc3MuZW52Lk9MRF9ORVc9PVwibmV3XCIgPyBcIl9uZXdcIiA6IFwiXCJcblxuZXhwb3J0IGNvbnN0IGNvbmZpZzogQ29uZmlnID0ge1xuICAgIHRhcmdldDogYmFzZVVSTCxcbiAgICBlbmdpbmVzOiB7XG4gICAgICBwbGF5d3JpZ2h0OiB7XG4gICAgICAgdHJhY2U6IGZhbHNlXG4gICAgICB9XG4gICAgfSxcbiAgICBwaGFzZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZHVyYXRpb246IFwiMm1cIixcbiAgICAgICAgICAgIGFycml2YWxSYXRlOiAxLFxuICAgICAgICAgICAgXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBcIjJtXCIsXG4gICAgICAgICAgICBhcnJpdmFsUmF0ZTogMixcbiAgICAgICAgfVxuICAgIF0gXG5cbiAgICBcbn07XG5cbmV4cG9ydCBjb25zdCBzY2VuYXJpb3M6IFNjZW5hcmlvW10gID0gW1xuICAgIC4uLihURVNUX1JPVVRFUy5tYXAocm91dGUgPT4gKHtcbiAgICAgICAgICAgIGVuZ2luZTogJ3BsYXl3cmlnaHQnLFxuICAgICAgICAgICAgdGVzdEZ1bmN0aW9uOiAocGFnZSkgPT4gbGluZVRlc3RzKHBhZ2UsIHJvdXRlLCBWRVJTSU9OKVxuICAgICAgICB9KVxuICAgICkpLFxuICAgIFxuICAgXG4gICAgXTtcblxuYXN5bmMgZnVuY3Rpb24gbGluZVNjZW5hcmlvKHsgcGFnZSwgYmFzZVVSTCwgcm91dGUsIG5ld1ZlcnNpb24gPSBmYWxzZX0pIHtcbiAgYXdhaXQgcGFnZS5nb3RvKGAke2Jhc2VVUkx9L3NjaGVkdWxlcy8ke3JvdXRlfS9saW5lJHtuZXdWZXJzaW9uID8gXCJfbmV3XCIgOiBcIlwifWApO1xuICBhd2FpdCBwYWdlLndhaXRGb3JMb2FkU3RhdGUoJ2xvYWQnKTtcbiAgbGV0IGF2Z190dGZiID0gMDsgXG4gIGxldCBhdmdfZG9tID0gMDtcbiAgbGV0IGF2Z19mdWxsID0gMDtcbiAgZm9yKGxldCBuPTA7bjxSRVBTO24rPTEpe1xuICAgICAgICBhd2FpdCBwYWdlLnJlbG9hZCgpO1xuICAgICAgICBjb25zdCB7dHRmYiwgZG9tLCBmdWxsfSA9IGF3YWl0IHBhZ2UuZXZhbHVhdGUoKCk9PntcbiAgICAgICAgICAgIGNvbnN0IG5hdiA9IHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUoJ25hdmlnYXRpb24nKVswXTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHRmYjogbmF2LnJlc3BvbnNlU3RhcnQgLSBuYXYucmVxdWVzdFN0YXJ0LFxuICAgICAgICAgICAgICAgIGRvbTogbmF2LmRvbUNvbnRlbnRMb2FkZWRFdmVudEVuZCxcbiAgICAgICAgICAgICAgICBmdWxsOiBuYXYubG9hZEV2ZW50RW5kLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSlcbiAgICAgICAgYXZnX3R0ZmIgKz0gdHRmYjtcbiAgICAgICAgYXZnX2RvbSArPSBkb207XG4gICAgICAgIGF2Z19mdWxsICs9IGZ1bGw7XG4gICAgfVxuXG4gICAgYXZnX3R0ZmIgPSBNYXRoLnJvdW5kKGF2Z190dGZiL1JFUFMpO1xuICAgIGF2Z19kb20gPSBNYXRoLnJvdW5kKGF2Z19kb20vUkVQUyk7XG4gICAgYXZnX2Z1bGwgPSBNYXRoLnJvdW5kKGF2Z19mdWxsL1JFUFMpO1xuICAgIGF3YWl0IHJlcG9ydF9yZXN1bHQoe3JvdXRlLCBuZXdWZXJzaW9uLCB0dGZiOiBhdmdfdHRmYiwgZG9tOiBhdmdfZG9tLCBmdWxsOiBhdmdfZnVsbCwgYmFzZVVSTCwgUkVQUywgdGFnOiBcImxpbmUtZGlhZ3JhbS1wZXJmb3JtYW5jZVwifSlcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVwb3J0X3Jlc3VsdCh7cm91dGUsIG5ld1ZlcnNpb24sIHR0ZmIsIGRvbSwgZnVsbCwgYmFzZVVSTCwgUkVQUywgdGFnfSl7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYXBwZW5kRmlsZShcbiAgICAgICAgICAgIFwiLi9wZXJmLXJlc3VsdHMvcGVyZl9saW5lLWRpYWdyYW0ucmVzdWx0c19sb2dcIixcbiAgICAgICAgICAgICBcIixcXG5cIiArIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgcm91dGUsIFxuICAgICAgICAgICAgICAgIG5ld1ZlcnNpb24sIFxuICAgICAgICAgICAgICAgIHJlc3VsdHM6IHt0dGZiLCBkb20sIGZ1bGx9LCBcbiAgICAgICAgICAgICAgICBob3N0OiAgYmFzZVVSTCwgXG4gICAgICAgICAgICAgICAgc2FtcGxlczogUkVQUywgXG4gICAgICAgICAgICAgICAgdGFnfSlcbiAgICAgICAgICAgIClcbiAgICB9Y2F0Y2goZSl7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEZpbGUgZXJyb3I6ICR7ZX1gKTtcbiAgICB9XG5cbn1cblxuYXN5bmMgZnVuY3Rpb24gbGluZVRlc3RzKHBhZ2UsIHJvdXRlLCBuZXdWZXJzaW9uKSB7XG4gICAgYXdhaXQgbGluZVNjZW5hcmlvKHtwYWdlLCBiYXNlVVJMLCByb3V0ZTogcm91dGUsIG5ld1ZlcnNpb259KVxuXG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0Esc0JBQTJCO0FBRTNCLElBQU0sVUFBVSxRQUFRLElBQUksT0FDeEIsV0FBVyxRQUFRLElBQUksSUFBSSxLQUMzQjtBQUNKLElBQU0sY0FBYyxDQUFDLFNBQVMsT0FBTyxlQUFlLFVBQVU7QUFFOUQsSUFBTSxPQUFPLFFBQVEsSUFBSSxPQUFPLE9BQU8sUUFBUSxJQUFJLElBQUksSUFBSTtBQUUzRCxJQUFNLFVBQVUsUUFBUSxJQUFJLFdBQVMsUUFBUSxTQUFTO0FBRS9DLElBQU0sU0FBaUI7QUFBQSxFQUMxQixRQUFRO0FBQUEsRUFDUixTQUFTO0FBQUEsSUFDUCxZQUFZO0FBQUEsTUFDWCxPQUFPO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNKO0FBQUEsTUFDSSxVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsSUFFakI7QUFBQSxJQUNBO0FBQUEsTUFDSSxVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsSUFDakI7QUFBQSxFQUNKO0FBR0o7QUFFTyxJQUFNLFlBQXlCO0FBQUEsRUFDbEMsR0FBSSxZQUFZO0FBQUEsSUFBSSxZQUFVO0FBQUEsTUFDdEIsUUFBUTtBQUFBLE1BQ1IsY0FBYyxDQUFDLFNBQVMsVUFBVSxNQUFNLE9BQU8sT0FBTztBQUFBLElBQzFEO0FBQUEsRUFDSjtBQUdBO0FBRUosZUFBZSxhQUFhLEVBQUUsTUFBTSxTQUFBQSxVQUFTLE9BQU8sYUFBYSxNQUFLLEdBQUc7QUFDdkUsUUFBTSxLQUFLLEtBQUssR0FBR0EsUUFBTyxjQUFjLEtBQUssUUFBUSxhQUFhLFNBQVMsRUFBRSxFQUFFO0FBQy9FLFFBQU0sS0FBSyxpQkFBaUIsTUFBTTtBQUNsQyxNQUFJLFdBQVc7QUFDZixNQUFJLFVBQVU7QUFDZCxNQUFJLFdBQVc7QUFDZixXQUFRLElBQUUsR0FBRSxJQUFFLE1BQUssS0FBRyxHQUFFO0FBQ2xCLFVBQU0sS0FBSyxPQUFPO0FBQ2xCLFVBQU0sRUFBQyxNQUFNLEtBQUssS0FBSSxJQUFJLE1BQU0sS0FBSyxTQUFTLE1BQUk7QUFDOUMsWUFBTSxNQUFNLFlBQVksaUJBQWlCLFlBQVksRUFBRSxDQUFDO0FBQ3hELGFBQU87QUFBQSxRQUNILE1BQU0sSUFBSSxnQkFBZ0IsSUFBSTtBQUFBLFFBQzlCLEtBQUssSUFBSTtBQUFBLFFBQ1QsTUFBTSxJQUFJO0FBQUEsTUFDZDtBQUFBLElBQ0osQ0FBQztBQUNELGdCQUFZO0FBQ1osZUFBVztBQUNYLGdCQUFZO0FBQUEsRUFDaEI7QUFFQSxhQUFXLEtBQUssTUFBTSxXQUFTLElBQUk7QUFDbkMsWUFBVSxLQUFLLE1BQU0sVUFBUSxJQUFJO0FBQ2pDLGFBQVcsS0FBSyxNQUFNLFdBQVMsSUFBSTtBQUNuQyxRQUFNLGNBQWMsRUFBQyxPQUFPLFlBQVksTUFBTSxVQUFVLEtBQUssU0FBUyxNQUFNLFVBQVUsU0FBQUEsVUFBUyxNQUFNLEtBQUssMkJBQTBCLENBQUM7QUFDekk7QUFFQSxlQUFlLGNBQWMsRUFBQyxPQUFPLFlBQVksTUFBTSxLQUFLLE1BQU0sU0FBQUEsVUFBUyxNQUFBQyxPQUFNLElBQUcsR0FBRTtBQUNsRixNQUFJO0FBQ0EsY0FBTTtBQUFBLE1BQ0Y7QUFBQSxNQUNDLFFBQVEsS0FBSyxVQUFVO0FBQUEsUUFDcEIsV0FBVyxLQUFLLElBQUk7QUFBQSxRQUNwQjtBQUFBLFFBQ0E7QUFBQSxRQUNBLFNBQVMsRUFBQyxNQUFNLEtBQUssS0FBSTtBQUFBLFFBQ3pCLE1BQU9EO0FBQUEsUUFDUCxTQUFTQztBQUFBLFFBQ1Q7QUFBQSxNQUFHLENBQUM7QUFBQSxJQUNSO0FBQUEsRUFDUixTQUFPLEdBQUU7QUFDTCxZQUFRLE1BQU0sZUFBZSxDQUFDLEVBQUU7QUFBQSxFQUNwQztBQUVKO0FBRUEsZUFBZSxVQUFVLE1BQU0sT0FBTyxZQUFZO0FBQzlDLFFBQU0sYUFBYSxFQUFDLE1BQU0sU0FBUyxPQUFjLFdBQVUsQ0FBQztBQUVoRTsiLAogICJuYW1lcyI6IFsiYmFzZVVSTCIsICJSRVBTIl0KfQo=
