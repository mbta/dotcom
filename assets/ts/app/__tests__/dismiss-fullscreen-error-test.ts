import registerDismissFullscreenError from "../dismiss-fullscreen-error";

const body = `
<div class="c-fullscreen-error__container js-fullscreen-error" style="display: block">
  <div class="container">
    <a class="c-fullscreen-error__dismiss js-fullscreen-error__dismiss" tabindex="0">Dismiss <i aria-hidden="true" class="notranslate fa fa-times "></i></a>
    <h1 class="c-fullscreen-error__heading">Danger</h1>
    <p>Will Robinson</p>
  </div>
</div>`;

test("dismiss fullscreen error with a click", () => {
  document.body.innerHTML = body;

  registerDismissFullscreenError();

  const containerEl = document.querySelector(
    ".js-fullscreen-error"
  ) as HTMLElement;

  expect(containerEl.getAttribute("style")).toEqual("display: block");

  const dismissEl = document.querySelector(
    ".js-fullscreen-error__dismiss"
  ) as HTMLElement;

  dismissEl.click();

  expect(containerEl.getAttribute("style")).toEqual("display: none");
});

test("dismiss fullscreen error with a key stroke", () => {
  document.body.innerHTML = body;

  registerDismissFullscreenError();

  const containerEl = document.querySelector(
    ".js-fullscreen-error"
  ) as HTMLElement;

  expect(containerEl.getAttribute("style")).toEqual("display: block");

  const dismissEl = document.querySelector(
    ".js-fullscreen-error__dismiss"
  ) as HTMLElement;

  const keyboardEvent = new KeyboardEvent("keydown", { key: "Enter" });
  dismissEl.dispatchEvent(keyboardEvent);

  expect(containerEl.getAttribute("style")).toEqual("display: none");
});

test("handle case where the element is not available", () => {
  document.body.innerHTML = `<div></div>`;
  registerDismissFullscreenError();
});
