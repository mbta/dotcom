export function getFeatureIcon(feature) {
  const icon = document.getElementById(`icon-feature-${feature}`);
  if (icon) {
    return icon.innerHTML;
  }
  return "";
}

export function getSvgIcon(feature) {
  const icon = document.getElementById(`icon-feature-${feature}`);
  if (icon) {
    const svg = icon.getElementsByTagName("svg").item(0);
    if (svg) {
      return svg.outerHTML;
    }
  }
  return "";
}
