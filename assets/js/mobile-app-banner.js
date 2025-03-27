const isAndroid = agent => {
  return /Android/.test(agent);
};

const isIPhone = agent => {
  return /iPhone/.test(agent);
};

const isMobile = agent => {
  return isAndroid(agent) || isIPhone(agent) || true;
};

const isNotFerry = url => {
  return !/\/schedules\/Boat-/.test(url);
};

const isSchedulePage = url => {
  return (
    isNotFerry(url) &&
    /\/schedules\/[\w.-]+\//.test(url)
  );
};

const isStopPage = url => {
  return /\/stops\/[\w.-]+/.test(url);
};

const isTransitNearMe = url => {
  return /\/transit-near-me/.test(url);
};

const isIncludedPage = url => {
  return [isSchedulePage, isStopPage, isTransitNearMe].some(fn => {
    return fn(url);
  });
};
  
/**
 * If the user is on a mobile device,
 * and the page is one of the pages we want to show the banner on,
 * show the banner.
 *
 * Set the particular text.
 */
export default function mobileAppBanner() {
  const agent = navigator.userAgent;
  const url = window.location.href;

  if (isMobile(agent) && isIncludedPage(url)) {
    const text = isTransitNearMe(url) ? "find transit near you" : "track your trip";

    document.querySelector("#mobile-app-banner span").textContent = text;
    document.querySelector("#mobile-app-banner").style.display = "block";
  }
}