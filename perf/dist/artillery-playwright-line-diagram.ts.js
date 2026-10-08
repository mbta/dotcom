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
var SPLUNK_URL = "https://dotcom-test-metrics.splunkcloud.com/services/collector";
var SPLUNK_TOKEN = process.env.SPLUNK_TOKEN;
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
  await report_result({ route, newVersion, ttfb: avg_ttfb, dom: avg_dom, full: avg_full, baseURL: baseURL2, REPS, tag: "line-diagram-performance" });
}
async function report_result({ route, newVersion, ttfb, dom, full, baseURL: baseURL2, REPS: REPS2, tag }) {
  await fetch(SPLUNK_URL, {
    headers: { "Authorization": `Splunk ${SPLUNK_TOKEN}` },
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vYXJ0aWxsZXJ5LXBsYXl3cmlnaHQtbGluZS1kaWFncmFtLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyB0eXBlIENvbmZpZywgdHlwZSBTY2VuYXJpbyB9IGZyb20gJ2FydGlsbGVyeSc7XG5pbXBvcnQgeyBvbGRUZXN0IH0gZnJvbSAnLi4vaW50ZWdyYXRpb24vZTJlX3Rlc3RzL2xpbmUtZGlhZ3JhbS1wZXJmLnNwZWMnO1xuY29uc3QgYmFzZVVSTCA9IHByb2Nlc3MuZW52LkhPU1RcbiAgPyBgaHR0cHM6Ly8ke3Byb2Nlc3MuZW52LkhPU1R9YFxuICA6IFwiaHR0cDovL2xvY2FsaG9zdDo0MDAxXCI7XG5jb25zdCBURVNUX1JPVVRFUyA9IFtcIkdyZWVuXCIsIFwiMjMwXCIsIFwiQ1ItRnJhbmtsaW5cIiwgXCJCb2F0LUYySFwiXVxuXG5jb25zdCBSRVBTID0gcHJvY2Vzcy5lbnYuUkVQUyA/IE51bWJlcihwcm9jZXNzLmVudi5SRVBTKSA6IDEwO1xuXG5jb25zdCBTUExVTktfVVJMID0gXCJodHRwczovL2RvdGNvbS10ZXN0LW1ldHJpY3Muc3BsdW5rY2xvdWQuY29tL3NlcnZpY2VzL2NvbGxlY3RvclwiO1xuY29uc3QgU1BMVU5LX0lOREVYX05BTUUgPSBcImRvdGNvbS10ZXN0LW1ldHJpY3NcIlxuY29uc3QgU1BMVU5LX1RPS0VOX05BTUUgPSBTUExVTktfSU5ERVhfTkFNRTtcbmNvbnN0IFNQTFVOS19UT0tFTiA9IHByb2Nlc3MuZW52LlNQTFVOS19UT0tFTjtcblxuZXhwb3J0IGNvbnN0IGNvbmZpZzogQ29uZmlnID0ge1xuICAgIHRhcmdldDogYmFzZVVSTCxcbiAgICBlbmdpbmVzOiB7XG4gICAgICBwbGF5d3JpZ2h0OiB7XG4gICAgICAgdHJhY2U6IGZhbHNlXG4gICAgICB9XG4gICAgfSxcbiAgICBwaGFzZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZHVyYXRpb246IFwiMW1cIixcbiAgICAgICAgICAgIGFycml2YWxSYXRlOiAxLFxuICAgICAgICAgICAgcmFtcFRvOiAxMFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwYXVzZTogJzEwcydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZHVyYXRpb246IFwiMW1cIixcbiAgICAgICAgICAgIGFycml2YWxSYXRlOiAxMCxcbiAgICAgICAgICAgIHJhbXBUbzogMTAwXG4gICAgICAgIH1cbiAgICBdIFxuXG4gICAgXG59O1xuXG5leHBvcnQgY29uc3Qgc2NlbmFyaW9zOiBTY2VuYXJpb1tdICA9IFtcbiAgICB7XG4gICAgICAgIGVuZ2luZTogJ3BsYXl3cmlnaHQnLFxuICAgICAgICB0ZXN0RnVuY3Rpb246IG9sZFRlc3RzXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGVuZ2luZTogJ3BsYXl3cmlnaHQnLFxuICAgICAgICB0ZXN0RnVuY3Rpb246IG5ld1Rlc3RzXG4gICAgfV07XG5cbmFzeW5jIGZ1bmN0aW9uIGxpbmVTY2VuYXJpbyh7IHBhZ2UsIGJhc2VVUkwsIHJvdXRlLCBuZXdWZXJzaW9uID0gZmFsc2V9KSB7XG4gIGF3YWl0IHBhZ2UuZ290byhgJHtiYXNlVVJMfS9zY2hlZHVsZXMvJHtyb3V0ZX0vbGluZSR7bmV3VmVyc2lvbiA/IFwiX25ld1wiIDogXCJcIn1gKTtcbiAgYXdhaXQgcGFnZS53YWl0Rm9yTG9hZFN0YXRlKCdsb2FkJyk7XG4gIGxldCBhdmdfdHRmYiA9IDA7IFxuICBsZXQgYXZnX2RvbSA9IDA7XG4gIGxldCBhdmdfZnVsbCA9IDA7XG4gIGZvcihsZXQgbj0wO248UkVQUztuKz0xKXtcbiAgICAgICAgYXdhaXQgcGFnZS5yZWxvYWQoKTtcbiAgICAgICAgY29uc3Qge3R0ZmIsIGRvbSwgZnVsbH0gPSBhd2FpdCBwYWdlLmV2YWx1YXRlKCgpPT57XG4gICAgICAgICAgICBjb25zdCBuYXYgPSBwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKCduYXZpZ2F0aW9uJylbMF07XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR0ZmI6IG5hdi5yZXNwb25zZVN0YXJ0IC0gbmF2LnJlcXVlc3RTdGFydCxcbiAgICAgICAgICAgICAgICBkb206IG5hdi5kb21Db250ZW50TG9hZGVkRXZlbnRFbmQsXG4gICAgICAgICAgICAgICAgZnVsbDogbmF2LmxvYWRFdmVudEVuZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pXG4gICAgICAgIGF2Z190dGZiICs9IHR0ZmI7XG4gICAgICAgIGF2Z19kb20gKz0gZG9tO1xuICAgICAgICBhdmdfZnVsbCArPSBmdWxsO1xuICAgIH1cblxuICAgIGF2Z190dGZiID0gTWF0aC5yb3VuZChhdmdfdHRmYi9SRVBTKTtcbiAgICBhdmdfZG9tID0gTWF0aC5yb3VuZChhdmdfZG9tL1JFUFMpO1xuICAgIGF2Z19mdWxsID0gTWF0aC5yb3VuZChhdmdfZnVsbC9SRVBTKTtcbiAgICBhd2FpdCByZXBvcnRfcmVzdWx0KHtyb3V0ZSwgbmV3VmVyc2lvbiwgdHRmYjogYXZnX3R0ZmIsIGRvbTogYXZnX2RvbSwgZnVsbDogYXZnX2Z1bGwsIGJhc2VVUkwsIFJFUFMsIHRhZzogXCJsaW5lLWRpYWdyYW0tcGVyZm9ybWFuY2VcIn0pXG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlcG9ydF9yZXN1bHQoe3JvdXRlLCBuZXdWZXJzaW9uLCB0dGZiLCBkb20sIGZ1bGwsIGJhc2VVUkwsIFJFUFMsIHRhZ30pe1xuICAgIGF3YWl0IGZldGNoKFNQTFVOS19VUkwsIHtcbiAgICAgICAgaGVhZGVyczoge1wiQXV0aG9yaXphdGlvblwiOiBgU3BsdW5rICR7U1BMVU5LX1RPS0VOfWB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7dGltZXN0YW1wOiBEYXRlLm5vdygpLCByb3V0ZSwgbmV3VmVyc2lvbiwgdHRmYiwgZG9tLCBmdWxsLCBiYXNlVVJMLCBSRVBTLCB0YWd9KSxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIlxuICAgIH0pLnRoZW4ocmVzcG9uc2U9PnJlc3BvbnNlLnRleHQoKSkudGhlbih0ZXh0ID0+IGNvbnNvbGUubG9nKHRleHQpKVxufVxuXG5hc3luYyBmdW5jdGlvbiBvbGRUZXN0cyhwYWdlKSB7XG4gICAgXG4gICAgYXdhaXQgbGluZVNjZW5hcmlvKHtwYWdlLCBiYXNlVVJMLCByb3V0ZTogXCJHcmVlblwiLCBuZXdWZXJzaW9uOiBmYWxzZX0pXG4gICAgXG59XG5cbmFzeW5jIGZ1bmN0aW9uIG5ld1Rlc3RzKHBhZ2UpIHtcbiAgICBhd2FpdCBsaW5lU2NlbmFyaW8oe3BhZ2UsIGJhc2VVUkwsIHJvdXRlOiBcIkdyZWVuXCIsIG5ld1ZlcnNpb246IHRydWV9KVxuXG59Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBLElBQU0sVUFBVSxRQUFRLElBQUksT0FDeEIsV0FBVyxRQUFRLElBQUksSUFBSSxLQUMzQjtBQUdKLElBQU0sT0FBTyxRQUFRLElBQUksT0FBTyxPQUFPLFFBQVEsSUFBSSxJQUFJLElBQUk7QUFFM0QsSUFBTSxhQUFhO0FBR25CLElBQU0sZUFBZSxRQUFRLElBQUk7QUFFMUIsSUFBTSxTQUFpQjtBQUFBLEVBQzFCLFFBQVE7QUFBQSxFQUNSLFNBQVM7QUFBQSxJQUNQLFlBQVk7QUFBQSxNQUNYLE9BQU87QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ0o7QUFBQSxNQUNJLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxNQUNiLFFBQVE7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLE1BQ0ksT0FBTztBQUFBLElBQ1g7QUFBQSxJQUNBO0FBQUEsTUFDSSxVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsTUFDYixRQUFRO0FBQUEsSUFDWjtBQUFBLEVBQ0o7QUFHSjtBQUVPLElBQU0sWUFBeUI7QUFBQSxFQUNsQztBQUFBLElBQ0ksUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLEVBQ2xCO0FBQUEsRUFDQTtBQUFBLElBQ0ksUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLEVBQ2xCO0FBQUM7QUFFTCxlQUFlLGFBQWEsRUFBRSxNQUFNLFNBQUFBLFVBQVMsT0FBTyxhQUFhLE1BQUssR0FBRztBQUN2RSxRQUFNLEtBQUssS0FBSyxHQUFHQSxRQUFPLGNBQWMsS0FBSyxRQUFRLGFBQWEsU0FBUyxFQUFFLEVBQUU7QUFDL0UsUUFBTSxLQUFLLGlCQUFpQixNQUFNO0FBQ2xDLE1BQUksV0FBVztBQUNmLE1BQUksVUFBVTtBQUNkLE1BQUksV0FBVztBQUNmLFdBQVEsSUFBRSxHQUFFLElBQUUsTUFBSyxLQUFHLEdBQUU7QUFDbEIsVUFBTSxLQUFLLE9BQU87QUFDbEIsVUFBTSxFQUFDLE1BQU0sS0FBSyxLQUFJLElBQUksTUFBTSxLQUFLLFNBQVMsTUFBSTtBQUM5QyxZQUFNLE1BQU0sWUFBWSxpQkFBaUIsWUFBWSxFQUFFLENBQUM7QUFDeEQsYUFBTztBQUFBLFFBQ0gsTUFBTSxJQUFJLGdCQUFnQixJQUFJO0FBQUEsUUFDOUIsS0FBSyxJQUFJO0FBQUEsUUFDVCxNQUFNLElBQUk7QUFBQSxNQUNkO0FBQUEsSUFDSixDQUFDO0FBQ0QsZ0JBQVk7QUFDWixlQUFXO0FBQ1gsZ0JBQVk7QUFBQSxFQUNoQjtBQUVBLGFBQVcsS0FBSyxNQUFNLFdBQVMsSUFBSTtBQUNuQyxZQUFVLEtBQUssTUFBTSxVQUFRLElBQUk7QUFDakMsYUFBVyxLQUFLLE1BQU0sV0FBUyxJQUFJO0FBQ25DLFFBQU0sY0FBYyxFQUFDLE9BQU8sWUFBWSxNQUFNLFVBQVUsS0FBSyxTQUFTLE1BQU0sVUFBVSxTQUFBQSxVQUFTLE1BQU0sS0FBSywyQkFBMEIsQ0FBQztBQUN6STtBQUVBLGVBQWUsY0FBYyxFQUFDLE9BQU8sWUFBWSxNQUFNLEtBQUssTUFBTSxTQUFBQSxVQUFTLE1BQUFDLE9BQU0sSUFBRyxHQUFFO0FBQ2xGLFFBQU0sTUFBTSxZQUFZO0FBQUEsSUFDcEIsU0FBUyxFQUFDLGlCQUFpQixVQUFVLFlBQVksR0FBRTtBQUFBLElBQ25ELE1BQU0sS0FBSyxVQUFVLEVBQUMsV0FBVyxLQUFLLElBQUksR0FBRyxPQUFPLFlBQVksTUFBTSxLQUFLLE1BQU0sU0FBQUQsVUFBUyxNQUFBQyxPQUFNLElBQUcsQ0FBQztBQUFBLElBQ3BHLFFBQVE7QUFBQSxFQUNaLENBQUMsRUFBRSxLQUFLLGNBQVUsU0FBUyxLQUFLLENBQUMsRUFBRSxLQUFLLFVBQVEsUUFBUSxJQUFJLElBQUksQ0FBQztBQUNyRTtBQUVBLGVBQWUsU0FBUyxNQUFNO0FBRTFCLFFBQU0sYUFBYSxFQUFDLE1BQU0sU0FBUyxPQUFPLFNBQVMsWUFBWSxNQUFLLENBQUM7QUFFekU7QUFFQSxlQUFlLFNBQVMsTUFBTTtBQUMxQixRQUFNLGFBQWEsRUFBQyxNQUFNLFNBQVMsT0FBTyxTQUFTLFlBQVksS0FBSSxDQUFDO0FBRXhFOyIsCiAgIm5hbWVzIjogWyJiYXNlVVJMIiwgIlJFUFMiXQp9Cg==
