export default () => {
  window.addEventListener("load", scrollTo, { passive: true });
};

const scrollTo = () => {
  window.requestAnimationFrame(() => {
    document.querySelectorAll("[data-scroll-to]").forEach((elToScrollTo) => {
      if (elToScrollTo) {
        doScrollTo(elToScrollTo);
      }
    });
  });
};

const doScrollTo = el => {
  const childLeft = el.offsetLeft;
  const parentLeft = el.parentNode.offsetLeft;
  const firstSiblingWidth = firstSibling(el).clientWidth;

  // childLeft - parentLeft scrolls the first row to the start of the
  // visible area.
  const scrollLeft = childLeft - parentLeft - firstSiblingWidth;
  let table = el.parentNode;
  while (table.nodeName !== "TABLE") {
    table = table.parentNode;
  }
  table.parentNode.scrollLeft = scrollLeft;
};

const firstSibling = element => {
  const sibling = element.parentNode.firstChild;
  if (sibling.nodeType === 1) {
    return sibling;
  } else if (sibling) {
    return sibling.nextElementSibling;
  } else {
    return null;
  }
};
