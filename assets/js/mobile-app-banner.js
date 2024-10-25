const isNotAndroid = () => {
  return !/Android/.test(navigator.userAgent);
};

const isNotCommuterRail = url => {
  return !/\/schedules\/CR-/.test(url);
};

const isAlertsPage = url => {
  return isNotCommuterRail(url) && /\/alerts/.test(url);
};

const isSchedulePage = url => {
  return /\/schedules\/[\w.-]+\/line/.test(url);
};

const isStopPage = url => {
  return /\/stops\/[\w.-]+/.test(url);
};

const isTransitNearMePage = url => {
  return /\/transit-near-me/.test(url);
};

const isIncludedPage = () => {
  const url = window.location.href;

  return [isAlertsPage, isSchedulePage, isStopPage, isTransitNearMePage].some(
    fn => {
      return fn(url);
    }
  );
};

/**
 * If the page is one of the pages we want to show the banner on
 * And the user is not on an Android device
 * Show the banner
 */
export default function mobileAppBanner() {
  if (isIncludedPage() && isNotAndroid()) {
    document.querySelector("#mobile-app-banner").style.display = "block";
  }
}
