export default function init() {
  const $ = window.jQuery;

  function onFocus(ev) {
    $(ev.target.parentNode).addClass("c-form__input-focused");
  }

  function onBlur(ev) {
    $(ev.target.parentNode).removeClass("c-form__input-focused");
  }

  $(document).on("focus", ".js-form__input", onFocus);
  $(document).on("blur", ".js-form__input", onBlur);
}
