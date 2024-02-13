const { expect } = require('@playwright/test');

exports.scenario = {
   name: 'Search for a station',
   run: async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/stops/subway`);

    // We should be able to use down arrow and enter to select the first result.
    // But, the enter key does not load the page. So, we have to click the first result.
    await page.locator('div.search-wrapper input#input').pressSequentially('Symphony');
    await page.waitForSelector('ul#algolia-list');
    await page.locator('ul#algolia-list li:first-child a').click();

    await expect(page.getByRole('heading', { name: 'Symphony', exact: true })).toBeVisible();
    await expect(page.locator('div.map--loaded')).toBeVisible();
    await page.waitForSelector('ul.stop-departures');
    await expect.poll(async () => page.locator('li.departure-card').count()).toBeGreaterThan(0);
  },
  threshold: 6000,
};
