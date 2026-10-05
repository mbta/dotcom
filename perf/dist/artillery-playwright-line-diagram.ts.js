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
var baseURL = process.env.HOST ? `https://${process.env.HOST}` : "http://localhost:4001";
var config = {
  target: baseURL,
  engines: {
    playwright: {
      trace: false
    }
  },
  phases: [
    {
      duration: "1m",
      arrivalRate: 1,
      rampTo: 10
    },
    {
      pause: "10s"
    },
    {
      duration: "1m",
      arrivalRate: 10,
      rampTo: 100
    }
  ]
};
var scenarios = [
  {
    engine: "playwright",
    testFunction: oldGreen
  },
  {
    engine: "playwright",
    testFunction: newGreen
  }
];
async function oldGreen(page) {
  await page.goto("https://dev.mbtace.com/schedules/Green/line");
  await page.waitForLoadState("load");
}
async function newGreen(page) {
  await page.goto("https://dev.mbtace.com/schedules/Green/line_new");
  await page.waitForLoadState("load");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config,
  scenarios
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vYXJ0aWxsZXJ5LXBsYXl3cmlnaHQtbGluZS1kaWFncmFtLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyB0eXBlIENvbmZpZywgdHlwZSBTY2VuYXJpbyB9IGZyb20gJ2FydGlsbGVyeSc7XG5cbmNvbnN0IGJhc2VVUkwgPSBwcm9jZXNzLmVudi5IT1NUXG4gID8gYGh0dHBzOi8vJHtwcm9jZXNzLmVudi5IT1NUfWBcbiAgOiBcImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMVwiO1xuXG5cblxuZXhwb3J0IGNvbnN0IGNvbmZpZzogQ29uZmlnID0ge1xuICAgIHRhcmdldDogYmFzZVVSTCxcbiAgICBlbmdpbmVzOiB7XG4gICAgICBwbGF5d3JpZ2h0OiB7XG4gICAgICAgdHJhY2U6IGZhbHNlXG4gICAgICB9XG4gICAgfSxcbiAgICBwaGFzZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZHVyYXRpb246IFwiMW1cIixcbiAgICAgICAgICAgIGFycml2YWxSYXRlOiAxLFxuICAgICAgICAgICAgcmFtcFRvOiAxMFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwYXVzZTogJzEwcydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZHVyYXRpb246IFwiMW1cIixcbiAgICAgICAgICAgIGFycml2YWxSYXRlOiAxMCxcbiAgICAgICAgICAgIHJhbXBUbzogMTAwXG4gICAgICAgIH1cbiAgICBdIFxuXG4gICAgXG59O1xuXG5leHBvcnQgY29uc3Qgc2NlbmFyaW9zOiBTY2VuYXJpb1tdICA9IFtcbiAgICB7XG4gICAgICAgIGVuZ2luZTogJ3BsYXl3cmlnaHQnLFxuICAgICAgICB0ZXN0RnVuY3Rpb246IG9sZEdyZWVuXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGVuZ2luZTogJ3BsYXl3cmlnaHQnLFxuICAgICAgICB0ZXN0RnVuY3Rpb246IG5ld0dyZWVuXG4gICAgfV07XG5cbmFzeW5jIGZ1bmN0aW9uIG9sZEdyZWVuKHBhZ2UpIHtcbiAgYXdhaXQgcGFnZS5nb3RvKCdodHRwczovL2Rldi5tYnRhY2UuY29tL3NjaGVkdWxlcy9HcmVlbi9saW5lJyk7XG4gIGF3YWl0IHBhZ2Uud2FpdEZvckxvYWRTdGF0ZSgnbG9hZCcpXG5cbn1cblxuYXN5bmMgZnVuY3Rpb24gbmV3R3JlZW4ocGFnZSkge1xuICBhd2FpdCBwYWdlLmdvdG8oJ2h0dHBzOi8vZGV2Lm1idGFjZS5jb20vc2NoZWR1bGVzL0dyZWVuL2xpbmVfbmV3Jyk7XG4gIGF3YWl0IHBhZ2Uud2FpdEZvckxvYWRTdGF0ZSgnbG9hZCcpXG5cbn0iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUEsSUFBTSxVQUFVLFFBQVEsSUFBSSxPQUN4QixXQUFXLFFBQVEsSUFBSSxJQUFJLEtBQzNCO0FBSUcsSUFBTSxTQUFpQjtBQUFBLEVBQzFCLFFBQVE7QUFBQSxFQUNSLFNBQVM7QUFBQSxJQUNQLFlBQVk7QUFBQSxNQUNYLE9BQU87QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ0o7QUFBQSxNQUNJLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxNQUNiLFFBQVE7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLE1BQ0ksT0FBTztBQUFBLElBQ1g7QUFBQSxJQUNBO0FBQUEsTUFDSSxVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsTUFDYixRQUFRO0FBQUEsSUFDWjtBQUFBLEVBQ0o7QUFHSjtBQUVPLElBQU0sWUFBeUI7QUFBQSxFQUNsQztBQUFBLElBQ0ksUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLEVBQ2xCO0FBQUEsRUFDQTtBQUFBLElBQ0ksUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLEVBQ2xCO0FBQUM7QUFFTCxlQUFlLFNBQVMsTUFBTTtBQUM1QixRQUFNLEtBQUssS0FBSyw2Q0FBNkM7QUFDN0QsUUFBTSxLQUFLLGlCQUFpQixNQUFNO0FBRXBDO0FBRUEsZUFBZSxTQUFTLE1BQU07QUFDNUIsUUFBTSxLQUFLLEtBQUssaURBQWlEO0FBQ2pFLFFBQU0sS0FBSyxpQkFBaUIsTUFBTTtBQUVwQzsiLAogICJuYW1lcyI6IFtdCn0K
