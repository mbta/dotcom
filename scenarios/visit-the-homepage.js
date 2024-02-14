const { expect } = require('@playwright/test');

exports.scenario = async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/`);

  await expect(page.getByRole('heading', { name: 'MBTA Homepage' })).toBeVisible();
};
