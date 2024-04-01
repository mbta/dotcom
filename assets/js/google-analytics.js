const track = () => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "pageView"
    });
  }
};

export default () => {
  window.addEventListener("load", track);
};
