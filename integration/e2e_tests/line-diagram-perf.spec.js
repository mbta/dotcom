import { lineScenario } from "../scenarios/load-line-diagram";
import { test } from "@playwright/test";

const baseURL = process.env.HOST
  ? `https://${process.env.HOST}`
  : "http://localhost:4001";

const REPS = process.env.REPS ? process.env.REPS * 1 : 10

test.describe("React (old) line diagram performance tests", {tag: "@performance"}, ()=>{
    ["Green", "230", "CR-Franklin", "Boat-F2H"].forEach((route)=>{
       
        test(`${route} load time`, {tag: `@${route}`}, async ({ page })=>{
            let avg_ttfb = 0;
            let avg_dom = 0;
            let avg_full = 0;
            for(let n=0;n<REPS;n+=1){
                await lineScenario({page, baseURL, route})
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
            
            console.log({route, REPS, avg_ttfb, avg_dom, avg_full, newVersion: false})
        })
    })
})

test.describe("Phoenix (new) line diagram performance tests", {tag: "@performance"}, ()=>{
    ["Green", "230", "CR-Franklin", "Boat-F2H"].forEach((route)=>{
       
        test(`${route} load time`, {tag: `@${route}`}, async ({ page })=>{
            let avg_ttfb = 0;
            let avg_dom = 0;
            let avg_full = 0;
            for(let n=0;n<REPS;n+=1){
                await lineScenario({page, baseURL, route, newVersion: true})
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
            
            console.log({route, REPS, avg_ttfb, avg_dom, avg_full})
        })
    })
})