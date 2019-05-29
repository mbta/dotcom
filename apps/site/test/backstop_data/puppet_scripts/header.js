module.exports = async (page, scenario, vp) => {
  // Header only shows up on desktop
  if (vp.label.includes('xs') || vp.label.includes('sm')) {
    return;
  }
  var sel = '[data-target="' + scenario.selectors + '"]';
  await page.click(sel);
  await page.waitForSelector(".in");
}
