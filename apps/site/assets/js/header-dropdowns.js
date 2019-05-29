export default function addCarets() {
  document.addEventListener("turbolinks:load", () => {
    initCarets();
  });
}

export function initCarets() {
  Array.from(document.getElementsByClassName("js-header-link")).forEach(init);

  function init(el) {
    el.classList.add("navbar-toggle", "toggle-up-down");
    el.setAttribute("data-toggle", "collapse");
    el.setAttribute("aria-expanded", "false");
    Array.from(el.children)
      .filter(child => child.classList.contains("js-header-link__content"))
      .forEach(addCarets);
  }

  function addCarets(el) {
    Array.from(el.children)
      .filter(child => child.classList.contains("js-header-link__carets"))
      .forEach(doAddCarets);
  }

  function doAddCarets(el) {
    ["up", "down"].forEach(name => addCaret(name, el));
  }

  function addCaret(name, container) {
    if (container.getElementsByClassName(name).item(0) == null) {
      const caret = document.createElement("i");

      caret.classList.add("fa");
      caret.classList.add("fa-angle-" + name);
      caret.classList.add(name);
      caret.setAttribute("aria-hidden", true);

      container.appendChild(caret);
    }
  }
}
