const { expect } = require('@playwright/test');

exports.scenario = {
   name: 'View commuter rail schedule',
   run: async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/schedules/commuter-rail`);

    await page.locator('input#search-route--commuter_rail__input').pressSequentially('Framingham');
    await page.waitForSelector('span.c-search-bar__-suggestions');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(page.getByRole('heading', { name: 'FRAMINGHAM/​WORCESTER' })).toBeVisible();
    await expect.poll(async () => page.locator('a.m-timetable__stop-link').count()).toBeGreaterThan(0);

    await expect(page.locator('a.m-timetable__stop-link:first-of-type').first()).toHaveText('Worcester');
    await expect(page.locator('a.m-timetable__stop-link:last-of-type').last()).toHaveText('South Station');

    await page.locator('a#direction-filter').click();

    await expect(page.locator('a.m-timetable__stop-link:first-of-type').first()).toHaveText('South Station');
    await expect(page.locator('a.m-timetable__stop-link:last-of-type').last()).toHaveText('Worcester');
  },
  threshold: 2500,
};
