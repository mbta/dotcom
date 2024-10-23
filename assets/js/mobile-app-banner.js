const isAlertsPage = url => {
  return /\/alerts/.test(url);
};

const isNotAndroid = () => {
  return !/Android/.test(navigator.userAgent);
};

const isNotCommuterRail = url => {
  return !/\/schedules\/CR-/.test(url);
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

const is = url => {
  return (
    isAlertsPage(url) ||
    isSchedulePage(url) ||
    isStopPage(url) ||
    isTransitNearMePage(url)
  );
};

const isNot = url => {
  return isNotAndroid() && isNotCommuterRail(url);
};

// Show the mobile app banner
export default function mobileAppBanner() {
  const url = window.location.href;

  if (is(url) && isNot(url)) {
    document.querySelector("#mobile-app-banner").style.display = "block";
  }
}
