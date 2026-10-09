import { lineScenario } from "../scenarios/load-line-diagram";
import { test } from "@playwright/test";
import { appendFile } from "node:fs";

const baseURL = process.env.HOST
  ? `https://${process.env.HOST}`
  : "http://localhost:4001";

const TEST_ROUTES = ["Green", "230", "CR-Franklin", "Boat-F2H"]
let output_table = {}
TEST_ROUTES.forEach(route=>{
    output_table = {[`${route}_new`]:false, [route]:false, ...output_table}
})
const REPS = process.env.REPS ? process.env.REPS * 1 : 10;
const centerPad = (str, len) => {
    const pad = (len - String(str).length)/2
    const left_pad = Math.floor(pad)
    const right_pad = Math.ceil(pad)
    return " ".repeat(left_pad)+String(str)+" ".repeat(right_pad)
}

const reportResult = ({route, newVersion, ttfb, dom, full})=>{
    output_table[`${route}${newVersion?"_new":""}`]= { ttfb, dom, full}
    appendFile(
            "./perf-results/perf_line-diagram.results_log",
            ",\n" + JSON.stringify({timestamp: Date.now(), host: baseURL, route: route, newVersion, samples: REPS, results: {ttfb, dom, full}}),
            (err)=>{err&&console.error(err)}
        )
    if(!(Object.keys(output_table).find(key => output_table[key]==false))){
        console.log("╔═════════════════╤════════╤════════╤════════╗");
        console.log("║      Route      │  TTFB  │  DOM   │  FULL  ║");
        console.log("╠═════════════════╪════════╪════════╪════════╣");
        Object.keys(output_table).sort().forEach((key, index) => {
            const {ttfb, dom, full} = output_table[key];
            console.log(`║${centerPad(key, 17)}│${centerPad(ttfb, 8)}│${centerPad(dom, 8)}│${centerPad(full, 8)}║`)
            index == Object.keys(output_table).length-1 ? console.log("╚═════════════════╧════════╧════════╧════════╝") : console.log("╠═════════════════╪════════╪════════╪════════╣");
        });
        
    }
}

test.describe("React (old) line diagram performance tests", {tag: "@performance"}, ()=>{
    TEST_ROUTES.forEach((route)=>{
       
        test(`${route} load time`, {tag: `@${route}`}, async ({ page })=>{
            let avg_ttfb = 0;
            let avg_dom = 0;
            let avg_full = 0;
            await lineScenario({page, baseURL, route})
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

            avg_ttfb = Math.round(avg_ttfb/REPS)
            avg_dom = Math.round(avg_dom/REPS)
            avg_full = Math.round(avg_full/REPS)

            test.info().annotations.push({
                type: "performance",
                description: `${route}_old_ttfb: ${avg_ttfb}ms`,
            });
            test.info().annotations.push({
                type: "performance",
                description: `${route}_old_dom: ${avg_dom}ms`,
            });
            test.info().annotations.push({
                type: "performance",
                description: `${route}_old_full: ${avg_full}ms`,
            });
            
            reportResult({route, newVersion: false, ttfb: avg_ttfb, dom: avg_dom, full: avg_full});
        })
    })
})

test.describe("Phoenix (new) line diagram performance tests", {tag: "@performance"}, ()=>{
    TEST_ROUTES.forEach((route)=>{
       
        test(`${route} load time`, {tag: `@${route}`}, async ({ page })=>{
            let avg_ttfb = 0;
            let avg_dom = 0;
            let avg_full = 0;
            await lineScenario({page, baseURL, route, newVersion: true})
            for(let n=0;n<REPS;n+=1){
                await page.reload();
                const {ttfb, dom, full} = await page.evaluate(()=>{
                    const nav = performance.getEntriesByType('navigation')[0];
                    return {
                        ttfb: nav.responseStart - nav.requestStart,
                        dom: nav.domInteractive,
                        full: nav.loadEventEnd,
                    };
                })
                avg_ttfb += ttfb;
                avg_dom += dom;
                avg_full += full;
            }

            avg_ttfb = Math.round(avg_ttfb/REPS)
            avg_dom = Math.round(avg_dom/REPS)
            avg_full = Math.round(avg_full/REPS)

            test.info().annotations.push({
                type: "performance",
                description: `${route}_new_ttfb: ${avg_ttfb}ms`,
            });
            test.info().annotations.push({
                type: "performance",
                description: `${route}_new_dom: ${avg_dom}ms`,
            });
            test.info().annotations.push({
                type: "performance",
                description: `${route}_new_full: ${avg_full}ms`,
            });
            
            reportResult({route, newVersion:true , ttfb: avg_ttfb, dom: avg_dom,full: avg_full});

        })
    })
})