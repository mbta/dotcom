export default function($) {
  $ = $ || window.jQuery;

  $(document).on("click", "#beta-announcement-dismiss", event => {
    const $target = $(event.currentTarget);
    event.preventDefault();
    $target.parents(".announcement-container").remove();
    const cookieName = $target.data("cookie-name");
    document.cookie = `${cookieName}=true; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  });
}
