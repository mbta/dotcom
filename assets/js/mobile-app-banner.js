const isAlertsPage = () => {
  const url = window.location.href;

  return /\/alerts\/(\w)+/.test(url);
};

const isIPhone = () => {
  return /iPhone/.test(navigator.userAgent);
};

const isSchedulePage = () => {
  const url = window.location.href;

  return /\/schedules\/(\w)+\/line/.test(url);
};

const isStopPage = () => {
  const url = window.location.href;

  return /\/stops\/(\w)+/.test(url);
};

// Show the mobile app banner
export default function mobileAppBanner() {
  if (isIPhone() && (isAlertsPage() || isSchedulePage() || isStopPage())) {
    document.querySelector("#mobile-app-banner").style.display = "block";
  }
}
