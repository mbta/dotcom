module.exports = async (page, scenario, vp) => {
  if (!(vp.label.includes('md') || vp.label.includes('lg') || vp.label.includes('xxl'))) {
    const sel = "#show-facets";
    if (await page.$(sel) !== null) {
      await page.click(sel);
    }
  }

  const facets = [
                  "#expansion-container-lines-routes",
                  "#expansion-container-stops",
                  "#expansion-container-pages-parent"
                 ];
  for (const facet of facets) {
    if (await page.$(facet) !== null) {
      await page.click(facet);
    }
  }
}

