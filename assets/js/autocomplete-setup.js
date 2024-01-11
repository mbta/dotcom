export default function() {
  document.addEventListener("turbolinks:load", setupAutocomplete, {
    passive: true
  });
  setupAutocomplete();
}

function setupAutocomplete() {
  const $elements = $("[data-autocomplete=true]");

  // do nothing if there are no autocomplete elements on the page
  if ($elements.length == 0) {
    return;
  }

  // these are the same bounds we use for OpenTripPlanner
  const mbtaWatershedBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(41.3193, -71.938),
    new google.maps.LatLng(42.8266, -69.6189)
  );
  const options = {
    strictBounds: true,
    bounds: mbtaWatershedBounds
  };

  $elements.each(function(idx, input) {
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    $(input).trigger("autocomplete:added", autocomplete);

    addLatLngListeners($, google.maps.event, autocomplete, input.id);
  });
}

export function addLatLngListeners($, event, autocomplete, id) {
  const $latInput = $(`#${id}_latitude`);
  const $lngInput = $(`#${id}_longitude`);

  if ($latInput.length && $lngInput.length) {
    const onPlaceChanged = placeChangedCallback(
      autocomplete,
      $latInput,
      $lngInput
    );

    event.addListener(autocomplete, "place_changed", onPlaceChanged);
  }
}

function placeChangedCallback(autocomplete, $latInput, $lngInput) {
  return function() {
    const place = autocomplete.getPlace();

    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      $latInput.val(lat);
      $lngInput.val(lng);
    } else {
      $latInput.val("");
      $lngInput.val("");
    }
  };
}
