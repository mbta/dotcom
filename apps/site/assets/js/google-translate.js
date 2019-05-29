// maximum wait time to get a reference to Google Translate select DOM element
const domPollLimitMilliseconds = 10000;

// default value for language
let currentLanguage = "en";

// setTimeout callback for tracking mutations
// this is used because the Google Translate component mutates the DOM
let domMutateCallback;

const languages = [
  ["ar", "Arabic"],
  ["zh-CN", "Chinese (Simplified)"],
  ["zh-TW", "Chinese (Traditional)"],
  ["fr", "French"],
  ["en", "English"],
  ["ht", "Haitian Creole"],
  ["it", "Italian"],
  ["km", "Khmer"],
  ["ko", "Korean"],
  ["pl", "Polish"],
  ["pt", "Portuguese"],
  ["ru", "Russian"],
  ["es", "Spanish"],
  ["vi", "Vietnamese"]
];

export default () =>
  document.addEventListener("turbolinks:load", handleTranslation);

// await reading the google translate component
const handleTranslation = () =>
  getTranslateElement()
    .then(translateEl => {
      registerEvents(translateEl);
      render();
    })
    .catch(_err => {
      // catch, but ignore errors
    });

const getTranslateElement = () =>
  new Promise((resolve, reject) => {
    pollDomForGoogleTranslateEl(200, resolve, reject);
  });

// if the dom element couldn't be found in 10 seconds (6 iterations), stop trying
const pollDomForGoogleTranslateEl = (delay, resolve, reject) =>
  delay > domPollLimitMilliseconds
    ? reject("taking too long to find element")
    : setTimeout(() => {
        const translateEl = document.querySelector(".goog-te-combo");
        if (translateEl) {
          resolve(translateEl);
        } else {
          // double the delay and retry
          pollDomForGoogleTranslateEl(delay * 2, resolve, reject);
        }
      }, delay);

const registerEvents = translateEl => {
  // initialize current language
  currentLanguage = getSelectedTranslation(translateEl);

  // detect when the language has been changed from outside
  // this works because Google's JS mutates the DOM
  translateEl.addEventListener("DOMNodeInserted", () => {
    if (domMutateCallback) {
      clearTimeout(domMutateCallback);
    }
    domMutateCallback = setTimeout(() => {
      const updatedLanguage = getSelectedTranslation(translateEl);
      if (currentLanguage !== updatedLanguage) {
        currentLanguage = updatedLanguage;
        render();
      }
    }, 500);
  });
};

// read select DOM el, if possible
const getSelectedTranslation = el =>
  el &&
  el.options &&
  el.options[el.selectedIndex] &&
  el.options[el.selectedIndex].value
    ? el.options[el.selectedIndex].value
    : "en";

// change the language in the component, trigger and event for it
const setTranslation = (translateEl, language) => {
  currentLanguage = language;
  translateEl.value = language;

  let event;
  if (typeof Event === "function") {
    event = new Event("change", { bubbles: true, cancelable: false });
  } else {
    event = document.createEvent("Event");
    event.initEvent("change", true, false);
  }
  translateEl.dispatchEvent(event);
};

const render = () => {
  // render desktop
  document.getElementById(
    "custom-language-selector"
  ).innerHTML = `${renderCustomDesktopSelect()}${renderCustomDesktopMenu()}`;

  // render mobile
  document.getElementById(
    "custom-language-button-mobile"
  ).innerHTML = renderCustomMobileSelect();

  document.getElementById(
    "custom-language-menu-mobile"
  ).innerHTML = renderCustomMobileMenu();

  // handle keyboard events on links
  document
    .getElementById("custom-language-selector")
    .addEventListener("keyup", triggerClick("language-menu-toggle"));
  document
    .getElementById("custom-language-selector-mobile")
    .addEventListener("keyup", triggerClick("custom-language-selector-mobile"));

  // add DOM event handling to rendered links in menu
  registerLinkEvents();
};

const renderCustomDesktopSelect = () =>
  `<a tabindex="0" id="language-menu-toggle" class="notranslate desktop-nav-link js-header-link navbar-toggle toggle-up-down collapsed" aria-expanded="false" aria-controls="languageMenu" data-parent="#desktop-menu" data-target="#languageMenu" role="tab" data-toggle="collapse">
    <div class="nav-link-content js-header-link__content">
      <span class="nav-link-name"><i class="fa fa-globe" aria-hidden="true"></i> ${currentLanguage.toUpperCase()}</span>
      <div class="nav-link-arrows js-header-link__carets">
        <i class="fa fa-angle-up up" aria-hidden="true"></i>
        <i class="fa fa-angle-down down" aria-hidden="true"></i>
      </div>
    </div>
  </a>`;

const renderCustomDesktopMenu = () => `
  <div class="desktop-menu desktop-menu--language">
    <div class="container">
      <div class="desktop-menu-body panel">
        <div class="collapse" id="languageMenu" role="tabpanel" aria-expanded="false">
          <div class="col-xs-4 header-column">
            <div class="col-xs-12 p-a-0">
              <ul class="language__linkcontainer">
              ${languages
                .map(
                  ([code, name]) =>
                    `<li><a tabindex="0" class="language__link ${
                      code === currentLanguage ? "language__link--active" : ""
                    }" data-toggle="language" data-lang="${code}">${name}</a></li>`
                )
                .join("")}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

const renderCustomMobileSelect = () =>
  `<button id="custom-language-selector-mobile" tabindex="0" class="u-pointer navbar-toggle-moble--language navbar-toggle navbar-toggle-mobile collapsed toggle-up-down" aria-expanded="false" type="button" data-toggle="collapse" data-target="#languageMenuMobile">
    <div class="nav-link-content js-header-link__content">
      <span class="nav-link-name notranslate"><i class="fa fa-globe" aria-hidden="true"></i> ${currentLanguage.toUpperCase()}</span>
      <div class="nav-link-arrows js-header-link__carets">
        <i class="fa fa-angle-up up" aria-hidden="true"></i>
        <i class="fa fa-angle-down down" aria-hidden="true"></i>
      </div>
    </div>
  </button>`;

const renderCustomMobileMenu = () => `
  <nav class="row collapse" id="languageMenuMobile" role="navigation" aria-expanded="true">
    <ul class="mobile-nav">
    ${languages
      .map(
        ([code, name]) =>
          `<li class="mobile-nav-item"><a tabindex="0" class="language__link language__link--mobile ${
            code === currentLanguage ? "language__link--mobile-active" : ""
          }" data-toggle="language" data-lang="${code}">${name}</a></li>`
      )
      .join("")}
    </ul>
  </nav>
`;

const registerLinkEvents = () => {
  const translateEl = document.querySelector(".goog-te-combo");
  [...document.querySelectorAll("a[data-toggle='language']")].forEach(
    linkEl => {
      linkEl.addEventListener(
        "click",
        event => {
          setTranslation(translateEl, event.target.getAttribute("data-lang"));
          render();
        },
        false
      );
      linkEl.addEventListener("keyup", triggerClick());
    }
  );
};

const triggerClick = target => event => {
  // pressing enter is a click
  if ((event.keyCode || event.which) !== 13) {
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  target ? document.getElementById(target).click() : event.target.click();
};
