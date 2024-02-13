const { expect } = require('@playwright/test');

exports.scenario = {
   name: 'View subway schedule',
   run: async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/schedules`);

    await page.locator('span.c-grid-button__name').getByText('Orange Line').click();

    await expect(page.locator('h1.schedule__route-name')).toHaveText('Orange Line');

    await page.waitForSelector('h4.m-schedule-diagram__stop-link a span');
    await expect.poll(async () => page.locator('h4.m-schedule-diagram__stop-link a span').count()).toBeGreaterThan(0);
    await expect(page.locator('h4.m-schedule-diagram__stop-link a span').first()).toHaveText('Oak Grove');
    await expect(page.locator('h4.m-schedule-diagram__stop-link a span').last()).toHaveText('Forest Hills');

    await page.locator('button.m-schedule-direction__button').click();

    await expect(page.locator('h4.m-schedule-diagram__stop-link a span').first()).toHaveText('Forest Hills');
    await expect(page.locator('h4.m-schedule-diagram__stop-link a span').last()).toHaveText('Oak Grove');
  },
  threshold: 2500,
};
