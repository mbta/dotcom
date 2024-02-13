const { expect } = require('@playwright/test');

exports.scenario = async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/`);

  // We should be able to use down arrow and enter to select the first result.
  // But, the enter key does not load the page. So, we have to click the first result.
  await page.locator('div.search-wrapper input#input').pressSequentially('safety');
  await page.waitForSelector('ul#algolia-list');
  await page.locator('ul#algolia-list li:first-child a').click();

  await expect(page.getByRole('heading', { name: 'Safety' })).toBeVisible();
};
