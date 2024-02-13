const { expect } = require('@playwright/test');

exports.scenario = {
   name: 'Visit the homepage',
   run: async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/`);

    await expect(page.getByRole('heading', { name: 'MBTA Homepage' })).toBeVisible();
  },
  threshold: 2000,
};
