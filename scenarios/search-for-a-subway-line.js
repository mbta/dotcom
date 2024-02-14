const { expect } = require('@playwright/test');

exports.scenario = async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/`);

  // We should be able to use down arrow and enter to select the first result.
  // But, the enter key does not load the page. So, we have to click the first result.
  await page.locator('div.search-wrapper input#input').pressSequentially('Green Line');
  await page.waitForSelector('ul#algolia-list');
  await page.locator('ul#algolia-list li:first-child a').click();

  await expect(page.locator('h1.schedule__route-name')).toHaveText('Green Line');
  await expect(page.locator('div.map--loaded')).toBeVisible();
  await page.waitForSelector('li.m-schedule-diagram__stop');
  await expect.poll(async () => page.locator('li.m-schedule-diagram__stop').count()).toBeGreaterThan(0);

  await page.locator('a.alerts-tab').click();
  await expect(page.getByRole('heading', { name: 'Alerts', exact: true })).toBeVisible();
};
