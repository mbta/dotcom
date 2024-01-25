const { expect } = require('@playwright/test');

exports.scenario = {
   name: 'Plan a trip',
   run: async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/`);

    await page.getByRole('button', { name: 'Transit' }).click();

    await page.getByLabel('Main navigation').getByRole('link', { name: 'Trip Planner' }).click();

    await expect(page.getByRole('heading', { name: 'Trip Planner' })).toBeVisible();
  },
  threshold: 2500,
};
