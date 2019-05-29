function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

module.exports = async (page, scenario, vp) => {
  if (await page.$("#plan_result_focus") !== null) {
    await page.click("#plan_result_focus");
    if (vp.label.includes("xs")) {
      await page.click(".trip-planner-edit-btn");
      await delay(1000);
    }
    await page.click(".trip-plan-title");
    await delay(3000);
  }
}
