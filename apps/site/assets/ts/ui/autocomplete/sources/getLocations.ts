import { AutocompleteSource } from "@algolia/autocomplete-js";
import { Item, LocationItem } from "../__autocomplete";
import { transitNearMeURL } from "../helpers";

const getLocations: AutocompleteSource<Item>["getItems"] = ({ query }) =>
  fetch(`/places/autocomplete/${encodeURIComponent(query)}/2/null`)
    .then(response => response.json())
    .then(async response => {
      const { predictions } = response;
      const addressDataList = JSON.parse(predictions);
      return Promise.all(
        addressDataList.map(
          (a: Pick<LocationItem, "highlighted_spans" | "address">) =>
            fetch(`/places/details/${encodeURIComponent(a.address)}`)
              .then(res => res.json())
              .then(res => {
                const { latitude, longitude, formatted } = JSON.parse(
                  res.result
                );
                const url = transitNearMeURL(
                  latitude,
                  longitude,
                  `from=search&query=${encodeURIComponent(
                    query
                  )}&address=${encodeURIComponent(formatted)}`
                );

                return {
                  ...a,
                  url
                } as LocationItem;
              })
        )
      );
    });

export default getLocations;
