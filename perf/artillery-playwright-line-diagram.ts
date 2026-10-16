import { type Config, type Scenario } from 'artillery';
import { appendFile } from 'node:fs/promises';

const baseURL = process.env.HOST
  ? `https://${process.env.HOST}`
  : "http://localhost:4001";
const TEST_ROUTES = ["Green", "230", "CR-Franklin", "Boat-F2H"]

const REPS = process.env.REPS ? Number(process.env.REPS) : 10;

const SPLUNK_URL = "https://http-inputs-mbta.splunkcloud.com/services/collector";
const SPLUNK_INDEX_NAME = "dotcom-test-metrics"
const SPLUNK_TOKEN_NAME = SPLUNK_INDEX_NAME;
const SPLUNK_TOKEN = process.env.SPLUNK_TOKEN;

const VERSION = process.env.OLD_NEW=="new" ? "_new" : ""

export const config: Config = {
    target: baseURL,
    engines: {
      playwright: {
       trace: false
      }
    },
    phases: [
        {
            duration: "2m",
            arrivalRate: 1,
            
        },
        {
            duration: "2m",
            arrivalRate: 2,
        }
    ] 

    
};

export const scenarios: Scenario[]  = [
    ...(TEST_ROUTES.map(route => ({
            engine: 'playwright',
            testFunction: (page) => lineTests(page, route, VERSION)
        })
    )),
    
   
    ];

async function lineScenario({ page, baseURL, route, newVersion = false}) {
  await page.goto(`${baseURL}/schedules/${route}/line${newVersion ? "_new" : ""}`);
  await page.waitForLoadState('load');
  let avg_ttfb = 0; 
  let avg_dom = 0;
  let avg_full = 0;
  for(let n=0;n<REPS;n+=1){
        await page.reload();
        const {ttfb, dom, full} = await page.evaluate(()=>{
            const nav = performance.getEntriesByType('navigation')[0];
            return {
                ttfb: nav.responseStart - nav.requestStart,
                dom: nav.domContentLoadedEventEnd,
                full: nav.loadEventEnd,
            };
        })
        avg_ttfb += ttfb;
        avg_dom += dom;
        avg_full += full;
    }

    avg_ttfb = Math.round(avg_ttfb/REPS);
    avg_dom = Math.round(avg_dom/REPS);
    avg_full = Math.round(avg_full/REPS);
    await report_result({route, newVersion, ttfb: avg_ttfb, dom: avg_dom, full: avg_full, baseURL, REPS, tag: "line-diagram-performance"})
}

async function report_result({route, newVersion, ttfb, dom, full, baseURL, REPS, tag}){
    try {
        await appendFile(
            "./perf-results/perf_line-diagram.results_log",
             ",\n" + JSON.stringify({
                timestamp: Date.now(),
                route, 
                newVersion, 
                results: {ttfb, dom, full}, 
                host:  baseURL, 
                samples: REPS, 
                tag})
            )
    }catch(e){
        console.error(`File error: ${e}`);
    }

    //If we figure the splunk credentials out, uncomment this
   /* await fetch(SPLUNK_URL, {
        headers: {"Authorization": `Splunk ${SPLUNK_TOKEN}`},
        body: JSON.stringify({timestamp: Date.now(), route, newVersion, ttfb, dom, full, baseURL, REPS, tag}),
        method: "POST"
    }).then(response=>response.text()).then(text => console.log(text));*/

}

async function lineTests(page, route, newVersion) {
    await lineScenario({page, baseURL, route: route, newVersion})

}
