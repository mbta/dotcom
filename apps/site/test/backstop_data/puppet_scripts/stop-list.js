module.exports = async (page, scenario, vp) => {
  const sel = "[data-select-modal='origin']";
  if (await page.$(sel) !== null) {
    await page.click(sel);
  }
}
