import { type Config, type Scenario } from 'artillery';

const baseURL = process.env.HOST
  ? `https://${process.env.HOST}`
  : "http://localhost:4001";



export const config: Config = {
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
            pause: '10s'
        },
        {
            duration: "1m",
            arrivalRate: 10,
            rampTo: 100
        }
    ] 

    
};

export const scenarios: Scenario[]  = [
    {
        engine: 'playwright',
        testFunction: oldGreen
    },
    {
        engine: 'playwright',
        testFunction: newGreen
    }];

async function oldGreen(page) {
  await page.goto('https://dev.mbtace.com/schedules/Green/line');
  await page.waitForLoadState('load')

}

async function newGreen(page) {
  await page.goto('https://dev.mbtace.com/schedules/Green/line_new');
  await page.waitForLoadState('load')

}