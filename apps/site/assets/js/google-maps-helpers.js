const sessionTokenValue = tokenObj => (tokenObj ? tokenObj.Pf : null);

export function autocomplete({ input, hitLimit, sessionToken }) {
  if (input.length === 0) {
    return Promise.resolve({});
  }

  return new Promise((resolve, reject) => {
    window.jQuery
      .getJSON(
        `/places/autocomplete/${encodeURIComponent(
          input
        )}/${hitLimit}/${sessionTokenValue(sessionToken)}`
      )
      .done(processAutocompleteResults(resolve))
      .fail(reject);
  });
}

export const lookupPlace = address =>
  new Promise((resolve, reject) => {
    window.jQuery
      .getJSON(`/places/details/${encodeURIComponent(address)}`)
      .done(processPlacesCallback(resolve))
      .fail(reject);
  });

export const reverseGeocode = (latitude, longitude) =>
  new Promise((resolve, reject) => {
    window.jQuery
      .getJSON(`/places/reverse-geocode/${latitude}/${longitude}`)
      .done(processGeocodeCallback(resolve, reject))
      .fail(reject);
  });

const processAutocompleteResults = resolve => ({ predictions }) =>
  resolve(predictionResults(JSON.parse(predictions)));

const predictionResults = predictions => ({
  locations: {
    hits: predictions.map((p, i) => ({ ...p, id: `location-${i}` })),
    nbHits: predictions.length
  }
});

const processPlacesCallback = resolve => ({ result }) =>
  resolve(JSON.parse(result));

const processGeocodeCallback = (resolve, reject) => ({ results }) => {
  const parsedResults = JSON.parse(results);
  if (parsedResults[0]) {
    resolve(parsedResults[0].formatted);
  } else {
    reject("No results");
  }
};
