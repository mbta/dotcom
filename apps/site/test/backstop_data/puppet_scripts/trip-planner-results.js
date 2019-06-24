function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

module.exports = async (page, scenario, vp) => {
  if ((await page.$("#header-itinerary-1")) !== null) {
    await page.click("#header-itinerary-1");
    if (vp.label.includes("xs")) {
      await page.click(".trip-planner-edit-btn");
      await delay(1000);
    }
    await page.click(".trip-plan-title");
    await delay(3000);
  }
};
