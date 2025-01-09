import { ViewHook } from "phoenix_live_view";
import setupAlgoliaAutocomplete from "../ui/autocomplete";
import {
  Item,
  LocationItem,
  PopularItem,
  StopItem
} from "../ui/autocomplete/__autocomplete";

function valuesFromData(data: Partial<Item>): object {
  const name =
    (data["name" as keyof Item] as string) ||
    (data as LocationItem).formatted ||
    (data as StopItem).stop?.name ||
    "";
  const stop_id =
    (data as StopItem).stop?.id || (data as PopularItem).stop_id || "";
  const longitude = data.longitude || (data as StopItem).stop?.longitude || "";
  const latitude = data.latitude || (data as StopItem).stop?.latitude || "";
  return { name, stop_id, latitude, longitude };
}

const AlgoliaAutocomplete: Partial<ViewHook> = {
  mounted() {
    if (this.el) {
      let pushToLiveView: Function | undefined;
      let initialState: Function | undefined;
      let key: string | undefined;
      const isTripPlanner = !!this.el?.querySelector(
        "[data-config='trip-planner']"
      );

      if (isTripPlanner) {
        key = this.el.id.replace("trip-planner-input-form--", ""); // "from"/"to"
        pushToLiveView = (data: Partial<Item>): void => {
          this.pushEvent!("input_form_change", {
            input_form: {
              [key!]: valuesFromData(data)
            }
          });
        };
        initialState = (): string =>
          this.el
            ?.parentElement!.querySelector('input[name*="name"]')
            ?.getAttribute("value") || "";
      }

      const autocompleteWidget = setupAlgoliaAutocomplete(
        this.el,
        pushToLiveView,
        initialState
      );

      if (isTripPlanner && key) {
        this.handleEvent!("set-query", values => {
          // @ts-ignore
          const name = values[key]?.name || "";
          autocompleteWidget.setQuery(name);
        });
      }
    }
  }
};

export default AlgoliaAutocomplete;
