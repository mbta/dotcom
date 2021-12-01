const turbolinks = ($, w = window, doc = document) => {
  var lastScrollPosition = null;
  var scrollBehavior = null;
  var redirectTimeout = null;
  var navigationEventType = "push";
  var currentUrl = getCurrentUrl();

  w.addEventListener(
    "popstate",
    ev => {
      navigationEventType = "pop";
      var url = w.location.href;
      if (redirectTimeout && !url.match(/redirect/)) {
        w.clearTimeout(redirectTimeout);
        redirectTimeout = null;
      }
      currentUrl = url;
    },
    { passive: true }
  );

  doc.addEventListener(
    "turbolinks:before-visit",
    ev => {
      // cancel a previously set redirect timeout
      if (redirectTimeout) {
        w.clearTimeout(redirectTimeout);
        redirectTimeout = null;
      }

      // for every visit, there is an active element. That active element probably doesn't say much about whether the
      // page should scroll or not after it is loaded, so the default behaviour is to consider if the link is to the
      // same page, and if it is, retain the same position. But if the active element indicated what scroll action to take
      // then that preference should override the default behavior
      lastScrollPosition = [w.scrollX, w.scrollY];
      switch (
        ev.srcElement.activeElement &&
        ev.srcElement.activeElement.dataset &&
        ev.srcElement.activeElement.dataset.scroll
      ) {
        // allow the page to scroll on focus, or not at all if there is no focus
        case "true":
          scrollBehavior = "none";
          break;

        // prevent any scrolling for any reason
        case "false":
          scrollBehavior = "remember";
          break;

        // decide remember the position if the current page and next page have the same path
        // allow scroll if the new url is an anchor link on the same page
        default:
          if (samePathWithQueryString(ev.data.url, currentUrl)) {
            scrollBehavior = "remember";
          } else if (withAnchor(ev.data.url)) {
            scrollBehavior = "scroll";
          } else {
            scrollBehavior = "top";
          }
      }
    },
    { passive: true }
  );

  doc.addEventListener(
    "turbolinks:render",
    () => {
      // if it's cached render, not a real one, set the scroll/focus positions,
      // but don't clear them until we have the true rendering.
      const cachedRender =
        doc.documentElement.getAttribute("data-turbolinks-preview") === "";
      if (!cachedRender && w.location.hash) {
        const el = doc.getElementById(w.location.hash.slice(1));
        if (el) {
          focusAndExpand(el, $);
        }
      }

      // scroll page depeneding on previously determined conditions
      // only do this on pushes, if the user is going back in their history, let turbolinks restore the scroll position
      if (navigationEventType == "push") {
        switch (scrollBehavior) {
          case "remember":
            w.scrollTo.apply(window, lastScrollPosition);
            break;

          case "top":
            w.scrollTo.apply(window, [0, 0]);
        }
      }

      // reset history state to default
      navigationEventType = "push";
    },
    { passive: true }
  );

  doc.addEventListener(
    "turbolinks:request-end",
    ev => {
      // update the current url
      currentUrl = getCurrentUrl();

      // if a refresh header was receieved, enforce via javascript
      var refreshHeader = ev.data.xhr.getResponseHeader("Refresh");
      if (!refreshHeader) {
        return;
      }

      // parse data from the header
      var refreshUrl = refreshHeader.substring(refreshHeader.indexOf("=") + 1);
      var refreshDelay = refreshHeader.split(";")[0] * 1000;

      // redirect after 5 seconds
      redirectTimeout = w.setTimeout(() => {
        doc.location = refreshUrl;
      }, refreshDelay);
    },
    { passive: true }
  );
};

export function samePathWithQueryString(first, second) {
  return (
    samePath(first, second, "?") &&
    // Don't consider it the same path if we are switching tabs
    !includesTabParam(first)
  );
}

export function samePathWithAnchor(first, second) {
  return samePath(first, second, "#");
}

function samePath(first, second, suffix_char) {
  return (
    first.slice(0, second.length) === second &&
    (first.length == second.length || first[second.length] === suffix_char)
  );
}

function withAnchor(urlString) {
  return urlString.includes("#");
}

function includesTabParam(path) {
  return path.split("?").length >= 2 && path.split("?")[1].includes("tab=");
}

function getCurrentUrl() {
  return `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
}

function focusAndExpand(el, $) {
  const nodeName = el.nodeName;
  // if tabindex has been explicitly set, or if we're focusing a
  // link, select, or input, then focus it directly. otherwise, find
  // the first child link and focus that.
  if (
    el.getAttribute("tabindex") === "0" ||
    nodeName === "A" ||
    nodeName === "SELECT" ||
    nodeName === "INPUT"
  ) {
    el.focus();
  } else {
    const a = el.querySelector("a");
    if (a != null) {
      a.focus();
      // if the link we focused is the target for a collapse, then show
      // the collapsed element
      if (a.getAttribute("data-target") == window.location.hash) {
        $(el).collapse("show");
      }
    }
  }
}

export default turbolinks;
