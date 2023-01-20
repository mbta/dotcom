export function getUrlParameter(sParam, search_string) {
  const sPageURL = decodeURIComponent(search_string.substring(1));
  const sURLVariables = sPageURL.split("&");
  let sParameterName;
  let i;

  // eslint-disable-next-line no-plusplus
  for (i = 0; i < sURLVariables.length; i += 1) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
  return null;
}

// Determines if form should be re-submitted. If place name has not changed
// Do not resubmit the form
// This is done to preserve the names of landmarks
export function validateLocationForm(event, location, input) {
  const val = input.value;
  const name = input.getAttribute("name");
  if (val === getUrlParameter(name, location.search)) {
    event.preventDefault();
    location.reload();
    return false;
  }
  return true;
}

export function constructUrl(place, input) {
  const id = input.getAttribute("id");
  const name = input.getAttribute("name");
  var query_str;
  const loc = window.location;
    const location_url = loc.protocol + "//" + loc.host + loc.pathname;
    const addr = input.value;

  if (place.geometry) {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    query_str = `?latitude=${lat}&longitude=${lng}&${name}=${addr}#${id}`;
  } else {
    query_str = `?${name}=${place.name}#${id}`;
  }
  return location_url + query_str;
}

export function addLocationChangedEventListener(autocomplete, input) {
  function onPlaceChanged() {
    const locationUrl = constructUrl(autocomplete.getPlace(), input);
    window.location.href = encodeURI(locationUrl);
  }
  google.maps.event.addListener(autocomplete, "place_changed", onPlaceChanged);
}

function geolocationCallback(ev, location) {
  const path = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
  const qs = `?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`;
  window.location.href = encodeURI(path + qs + "#address-search-input");
}

export default function() {
  function addLocationChangeCallback(ev, autocomplete) {
    addLocationChangedEventListener(autocomplete, ev.target);
  }
  
  function setupLocationInput() {
    const transitNearMeInput = document.getElementById("address-search-input");

    // only load on pages that are using the location input
    if (!transitNearMeInput) {
      return;
    }

    transitNearMeInput.form.addEventListener("submit", ev =>
      // eslint-disable-next-line no-use-before-define
      validateLocationForm(ev, window.location, transitNearMeInput)
    );
  }

  document.addEventListener("turbolinks:load", setupLocationInput, {
    passive: true
  });
  $(document).on(
    "autocomplete:added",
    "#address-search-input",
    // eslint-disable-next-line no-use-before-define
    addLocationChangeCallback
  );
  $(document).on(
    "geolocation:complete",
    "#address-search-input",
    // eslint-disable-next-line no-use-before-define
    geolocationCallback
  );
}
