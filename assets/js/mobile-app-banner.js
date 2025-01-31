const isAndroid = () => {
  return /Android/.test(navigator.userAgent);
};

const isNotCommuterRail = url => {
  return !/\/schedules\/CR-/.test(url);
};

const isNotFerry = url => {
  return !/\/schedules\/Boat-/.test(url);
};

const isNotTripPlanner = url => {
  return !/\/trip-planner/.test(url);
};

const isAlertsPage = url => {
  return isNotCommuterRail(url) && isNotFerry(url) && /\/alerts/.test(url);
};

const isSchedulePage = url => {
  return (
    isNotCommuterRail(url) &&
    isNotFerry(url) &&
    /\/schedules\/[\w.-]+\//.test(url)
  );
};

const isStopPage = url => {
  return /\/stops\/[\w.-]+/.test(url);
};

const isIncludedPage = () => {
  const url = window.location.href;

  return [isAlertsPage, isSchedulePage, isStopPage, isNotTripPlanner].some(
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
  if (isAndroid() && isIncludedPage()) {
    document.querySelector("#mobile-app-banner").style.display = "block";
  }
}