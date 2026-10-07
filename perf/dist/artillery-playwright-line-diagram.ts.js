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
var REPS = process.env.REPS ? Number(process.env.REPS) : 10;
var SPLUNK_URL = "https://http-inputs-mbta.splunkcloud.com/services/collector";
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
    testFunction: oldTests
  },
  {
    engine: "playwright",
    testFunction: newTests
  }
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
  report_result({ route, newVersion, ttfb: avg_ttfb, dom: avg_dom, full: avg_full, baseURL: baseURL2, REPS, tag: "line-diagram-performance" });
}
function report_result({ route, newVersion, ttfb, dom, full, baseURL: baseURL2, REPS: REPS2, tag }) {
  fetch(SPLUNK_URL, {
    headers: { "Authorization": "Splunk {$SPLUNK_TOKEN}" },
    body: JSON.stringify({ timestamp: Date.now(), route, newVersion, ttfb, dom, full, baseURL: baseURL2, REPS: REPS2, tag }),
    method: "POST"
  }).then((response) => response.text()).then((text) => console.log(text));
}
async function oldTests(page) {
  await lineScenario({ page, baseURL, route: "Green", newVersion: false });
}
async function newTests(page) {
  await lineScenario({ page, baseURL, route: "Green", newVersion: true });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config,
  scenarios
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vYXJ0aWxsZXJ5LXBsYXl3cmlnaHQtbGluZS1kaWFncmFtLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyB0eXBlIENvbmZpZywgdHlwZSBTY2VuYXJpbyB9IGZyb20gJ2FydGlsbGVyeSc7XG5pbXBvcnQgeyBvbGRUZXN0IH0gZnJvbSAnLi4vaW50ZWdyYXRpb24vZTJlX3Rlc3RzL2xpbmUtZGlhZ3JhbS1wZXJmLnNwZWMnO1xuY29uc3QgYmFzZVVSTCA9IHByb2Nlc3MuZW52LkhPU1RcbiAgPyBgaHR0cHM6Ly8ke3Byb2Nlc3MuZW52LkhPU1R9YFxuICA6IFwiaHR0cDovL2xvY2FsaG9zdDo0MDAxXCI7XG5jb25zdCBURVNUX1JPVVRFUyA9IFtcIkdyZWVuXCIsIFwiMjMwXCIsIFwiQ1ItRnJhbmtsaW5cIiwgXCJCb2F0LUYySFwiXVxuXG5jb25zdCBSRVBTID0gcHJvY2Vzcy5lbnYuUkVQUyA/IE51bWJlcihwcm9jZXNzLmVudi5SRVBTKSA6IDEwO1xuXG5jb25zdCBTUExVTktfVVJMID0gXCJodHRwczovL2h0dHAtaW5wdXRzLW1idGEuc3BsdW5rY2xvdWQuY29tL3NlcnZpY2VzL2NvbGxlY3RvclwiO1xuY29uc3QgU1BMVU5LX0lOREVYX05BTUUgPSBcImRvdGNvbS10ZXN0LW1ldHJpY3NcIlxuY29uc3QgU1BMVU5LX1RPS0VOX05BTUUgPSBTUExVTktfSU5ERVhfTkFNRTtcbmNvbnN0IFNQTFVOS19UT0tFTiA9IFwiZWIwOGEwZDItZGEzYi00ODU3LTk3NjAtYWMzOGJiOTQzMmUyXCI7XG5cbmV4cG9ydCBjb25zdCBjb25maWc6IENvbmZpZyA9IHtcbiAgICB0YXJnZXQ6IGJhc2VVUkwsXG4gICAgZW5naW5lczoge1xuICAgICAgcGxheXdyaWdodDoge1xuICAgICAgIHRyYWNlOiBmYWxzZVxuICAgICAgfVxuICAgIH0sXG4gICAgcGhhc2VzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBcIjFtXCIsXG4gICAgICAgICAgICBhcnJpdmFsUmF0ZTogMSxcbiAgICAgICAgICAgIHJhbXBUbzogMTBcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcGF1c2U6ICcxMHMnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBcIjFtXCIsXG4gICAgICAgICAgICBhcnJpdmFsUmF0ZTogMTAsXG4gICAgICAgICAgICByYW1wVG86IDEwMFxuICAgICAgICB9XG4gICAgXSBcblxuICAgIFxufTtcblxuZXhwb3J0IGNvbnN0IHNjZW5hcmlvczogU2NlbmFyaW9bXSAgPSBbXG4gICAge1xuICAgICAgICBlbmdpbmU6ICdwbGF5d3JpZ2h0JyxcbiAgICAgICAgdGVzdEZ1bmN0aW9uOiBvbGRUZXN0c1xuICAgIH0sXG4gICAge1xuICAgICAgICBlbmdpbmU6ICdwbGF5d3JpZ2h0JyxcbiAgICAgICAgdGVzdEZ1bmN0aW9uOiBuZXdUZXN0c1xuICAgIH1dO1xuXG5hc3luYyBmdW5jdGlvbiBsaW5lU2NlbmFyaW8oeyBwYWdlLCBiYXNlVVJMLCByb3V0ZSwgbmV3VmVyc2lvbiA9IGZhbHNlfSkge1xuICBhd2FpdCBwYWdlLmdvdG8oYCR7YmFzZVVSTH0vc2NoZWR1bGVzLyR7cm91dGV9L2xpbmUke25ld1ZlcnNpb24gPyBcIl9uZXdcIiA6IFwiXCJ9YCk7XG4gIGF3YWl0IHBhZ2Uud2FpdEZvckxvYWRTdGF0ZSgnbG9hZCcpO1xuICBsZXQgYXZnX3R0ZmIgPSAwOyBcbiAgbGV0IGF2Z19kb20gPSAwO1xuICBsZXQgYXZnX2Z1bGwgPSAwO1xuICBmb3IobGV0IG49MDtuPFJFUFM7bis9MSl7XG4gICAgICAgIGF3YWl0IHBhZ2UucmVsb2FkKCk7XG4gICAgICAgIGNvbnN0IHt0dGZiLCBkb20sIGZ1bGx9ID0gYXdhaXQgcGFnZS5ldmFsdWF0ZSgoKT0+e1xuICAgICAgICAgICAgY29uc3QgbmF2ID0gcGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5VHlwZSgnbmF2aWdhdGlvbicpWzBdO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0dGZiOiBuYXYucmVzcG9uc2VTdGFydCAtIG5hdi5yZXF1ZXN0U3RhcnQsXG4gICAgICAgICAgICAgICAgZG9tOiBuYXYuZG9tQ29udGVudExvYWRlZEV2ZW50RW5kLFxuICAgICAgICAgICAgICAgIGZ1bGw6IG5hdi5sb2FkRXZlbnRFbmQsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KVxuICAgICAgICBhdmdfdHRmYiArPSB0dGZiO1xuICAgICAgICBhdmdfZG9tICs9IGRvbTtcbiAgICAgICAgYXZnX2Z1bGwgKz0gZnVsbDtcbiAgICB9XG5cbiAgICBhdmdfdHRmYiA9IE1hdGgucm91bmQoYXZnX3R0ZmIvUkVQUyk7XG4gICAgYXZnX2RvbSA9IE1hdGgucm91bmQoYXZnX2RvbS9SRVBTKTtcbiAgICBhdmdfZnVsbCA9IE1hdGgucm91bmQoYXZnX2Z1bGwvUkVQUyk7XG4gICAgcmVwb3J0X3Jlc3VsdCh7cm91dGUsIG5ld1ZlcnNpb24sIHR0ZmI6IGF2Z190dGZiLCBkb206IGF2Z19kb20sIGZ1bGw6IGF2Z19mdWxsLCBiYXNlVVJMLCBSRVBTLCB0YWc6IFwibGluZS1kaWFncmFtLXBlcmZvcm1hbmNlXCJ9KVxufVxuXG5mdW5jdGlvbiByZXBvcnRfcmVzdWx0KHtyb3V0ZSwgbmV3VmVyc2lvbiwgdHRmYiwgZG9tLCBmdWxsLCBiYXNlVVJMLCBSRVBTLCB0YWd9KXtcbiAgICBmZXRjaChTUExVTktfVVJMLCB7XG4gICAgICAgIGhlYWRlcnM6IHtcIkF1dGhvcml6YXRpb25cIjogXCJTcGx1bmsgeyRTUExVTktfVE9LRU59XCJ9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7dGltZXN0YW1wOiBEYXRlLm5vdygpLCByb3V0ZSwgbmV3VmVyc2lvbiwgdHRmYiwgZG9tLCBmdWxsLCBiYXNlVVJMLCBSRVBTLCB0YWd9KSxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIlxuICAgIH0pLnRoZW4ocmVzcG9uc2U9PnJlc3BvbnNlLnRleHQoKSkudGhlbih0ZXh0ID0+IGNvbnNvbGUubG9nKHRleHQpKVxufVxuXG5hc3luYyBmdW5jdGlvbiBvbGRUZXN0cyhwYWdlKSB7XG4gICAgXG4gICAgYXdhaXQgbGluZVNjZW5hcmlvKHtwYWdlLCBiYXNlVVJMLCByb3V0ZTogXCJHcmVlblwiLCBuZXdWZXJzaW9uOiBmYWxzZX0pXG4gICAgXG59XG5cbmFzeW5jIGZ1bmN0aW9uIG5ld1Rlc3RzKHBhZ2UpIHtcbiAgICBhd2FpdCBsaW5lU2NlbmFyaW8oe3BhZ2UsIGJhc2VVUkwsIHJvdXRlOiBcIkdyZWVuXCIsIG5ld1ZlcnNpb246IHRydWV9KVxuXG59Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBLElBQU0sVUFBVSxRQUFRLElBQUksT0FDeEIsV0FBVyxRQUFRLElBQUksSUFBSSxLQUMzQjtBQUdKLElBQU0sT0FBTyxRQUFRLElBQUksT0FBTyxPQUFPLFFBQVEsSUFBSSxJQUFJLElBQUk7QUFFM0QsSUFBTSxhQUFhO0FBS1osSUFBTSxTQUFpQjtBQUFBLEVBQzFCLFFBQVE7QUFBQSxFQUNSLFNBQVM7QUFBQSxJQUNQLFlBQVk7QUFBQSxNQUNYLE9BQU87QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ0o7QUFBQSxNQUNJLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxNQUNiLFFBQVE7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLE1BQ0ksT0FBTztBQUFBLElBQ1g7QUFBQSxJQUNBO0FBQUEsTUFDSSxVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsTUFDYixRQUFRO0FBQUEsSUFDWjtBQUFBLEVBQ0o7QUFHSjtBQUVPLElBQU0sWUFBeUI7QUFBQSxFQUNsQztBQUFBLElBQ0ksUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLEVBQ2xCO0FBQUEsRUFDQTtBQUFBLElBQ0ksUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLEVBQ2xCO0FBQUM7QUFFTCxlQUFlLGFBQWEsRUFBRSxNQUFNLFNBQUFBLFVBQVMsT0FBTyxhQUFhLE1BQUssR0FBRztBQUN2RSxRQUFNLEtBQUssS0FBSyxHQUFHQSxRQUFPLGNBQWMsS0FBSyxRQUFRLGFBQWEsU0FBUyxFQUFFLEVBQUU7QUFDL0UsUUFBTSxLQUFLLGlCQUFpQixNQUFNO0FBQ2xDLE1BQUksV0FBVztBQUNmLE1BQUksVUFBVTtBQUNkLE1BQUksV0FBVztBQUNmLFdBQVEsSUFBRSxHQUFFLElBQUUsTUFBSyxLQUFHLEdBQUU7QUFDbEIsVUFBTSxLQUFLLE9BQU87QUFDbEIsVUFBTSxFQUFDLE1BQU0sS0FBSyxLQUFJLElBQUksTUFBTSxLQUFLLFNBQVMsTUFBSTtBQUM5QyxZQUFNLE1BQU0sWUFBWSxpQkFBaUIsWUFBWSxFQUFFLENBQUM7QUFDeEQsYUFBTztBQUFBLFFBQ0gsTUFBTSxJQUFJLGdCQUFnQixJQUFJO0FBQUEsUUFDOUIsS0FBSyxJQUFJO0FBQUEsUUFDVCxNQUFNLElBQUk7QUFBQSxNQUNkO0FBQUEsSUFDSixDQUFDO0FBQ0QsZ0JBQVk7QUFDWixlQUFXO0FBQ1gsZ0JBQVk7QUFBQSxFQUNoQjtBQUVBLGFBQVcsS0FBSyxNQUFNLFdBQVMsSUFBSTtBQUNuQyxZQUFVLEtBQUssTUFBTSxVQUFRLElBQUk7QUFDakMsYUFBVyxLQUFLLE1BQU0sV0FBUyxJQUFJO0FBQ25DLGdCQUFjLEVBQUMsT0FBTyxZQUFZLE1BQU0sVUFBVSxLQUFLLFNBQVMsTUFBTSxVQUFVLFNBQUFBLFVBQVMsTUFBTSxLQUFLLDJCQUEwQixDQUFDO0FBQ25JO0FBRUEsU0FBUyxjQUFjLEVBQUMsT0FBTyxZQUFZLE1BQU0sS0FBSyxNQUFNLFNBQUFBLFVBQVMsTUFBQUMsT0FBTSxJQUFHLEdBQUU7QUFDNUUsUUFBTSxZQUFZO0FBQUEsSUFDZCxTQUFTLEVBQUMsaUJBQWlCLHlCQUF3QjtBQUFBLElBQ25ELE1BQU0sS0FBSyxVQUFVLEVBQUMsV0FBVyxLQUFLLElBQUksR0FBRyxPQUFPLFlBQVksTUFBTSxLQUFLLE1BQU0sU0FBQUQsVUFBUyxNQUFBQyxPQUFNLElBQUcsQ0FBQztBQUFBLElBQ3BHLFFBQVE7QUFBQSxFQUNaLENBQUMsRUFBRSxLQUFLLGNBQVUsU0FBUyxLQUFLLENBQUMsRUFBRSxLQUFLLFVBQVEsUUFBUSxJQUFJLElBQUksQ0FBQztBQUNyRTtBQUVBLGVBQWUsU0FBUyxNQUFNO0FBRTFCLFFBQU0sYUFBYSxFQUFDLE1BQU0sU0FBUyxPQUFPLFNBQVMsWUFBWSxNQUFLLENBQUM7QUFFekU7QUFFQSxlQUFlLFNBQVMsTUFBTTtBQUMxQixRQUFNLGFBQWEsRUFBQyxNQUFNLFNBQVMsT0FBTyxTQUFTLFlBQVksS0FBSSxDQUFDO0FBRXhFOyIsCiAgIm5hbWVzIjogWyJiYXNlVVJMIiwgIlJFUFMiXQp9Cg==
