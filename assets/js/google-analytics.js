const track = () => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "pageView"
    });
  }
};

export default () => {
  document.addEventListener("turbolinks:load", track);
};
