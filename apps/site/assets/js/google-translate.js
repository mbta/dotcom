import { setHeaderElementPositions } from "../ts/app/global-navigation";

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
  ["en", "English"],
  ["fr", "French"],
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

export default () => window.addEventListener("load", handleTranslation);

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
    const header = document.querySelector(".header--new");
    if (header) {
      setHeaderElementPositions(header);
    }

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
  /* Render either new or old version depending on which navigation is bring shown. */
  document
    .querySelectorAll(".m-menu__language")
    .forEach(el => (el.innerHTML = renderCustomSelect()));

  // handle keyboard events on links
  [...document.querySelectorAll(".custom-language-selector")].forEach(
    linkEl => {
      linkEl.addEventListener("keyup", triggerClick("language-menu-toggle"));
    }
  );

  // add DOM event handling to rendered links in menu
  registerLinkEvents();
};

const renderCustomSelect = () => `
  <i class="header-globe fa fa-globe fa-lg" aria-hidden="true"></i>
  <i class="footer-globe fa fa-globe fa-xl" aria-hidden="true"></i>
  <select class="custom-language-selector" aria-label="Page language">
  ${languages.map(
    ([code, name]) =>
      `<option ${
        code === currentLanguage ? "selected" : ""
      } data-toggle="language" data-lang="${code}">${name}</option>`
  )}
  </select>
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
  // new selector
  [...document.querySelectorAll(".custom-language-selector")].forEach(
    linkEl => {
      linkEl.addEventListener(
        "change",
        event => {
          setTranslation(
            translateEl,
            event.target.selectedOptions[0].getAttribute("data-lang")
          );
          render();
        },
        false
      );
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
