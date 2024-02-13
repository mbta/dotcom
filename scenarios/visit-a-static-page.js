const { expect } = require('@playwright/test');

exports.scenario = {
   name: 'Visit a static page',
   run: async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/`);

    await page.getByRole('button', { name: 'About' }).click();

    await page.getByLabel('Main navigation').getByRole('link', { name: 'Leadership' }).click();

    await expect(page.getByRole('heading', { name: 'Leadership at The MBTA' })).toBeVisible();
  },
  threshold: 2500,
};
