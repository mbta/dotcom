import { ViewHook } from "phoenix_live_view";
import LiveSocket from "phoenix_live_view/assets/js/types/live_socket";
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

const hasConnected = (liveSocket: LiveSocket): boolean => {
  return liveSocket.getSocket().connectionState() === "open";
};

const AlgoliaAutocomplete = {
  mounted() {
    if (this.el) {
      if (
        this.el.querySelector<HTMLElement>(".c-search-bar__autocomplete")
          ?.dataset.config === "trip-planner"
      ) {
        const key = this.el.id.replace("trip-planner-input-form--", ""); // "from"/"to"
        const pushToLiveView = (data: Partial<Item>): void => {
          const values = valuesFromData(data);

          // @ts-ignore
          if (hasConnected(this.liveSocket) && this.pushEvent) {
            this.pushEvent("input_form_change", {
              input_form: { [key]: values }
            });
          }

          // for the disconnected-to-LiveView case, make sure to write
          // the selected data into the form fields themselves.
          const inputsEl = this.el?.parentElement;
          if (inputsEl) {
            ["latitude", "longitude", "name", "stop_id"].forEach(name => {
              const input = inputsEl.querySelector<HTMLInputElement>(
                `input[name*=${name}]`
              );
              // @ts-ignore
              if (input) input.value = values[name];
            });
          }
        };

        const initialState = (): string =>
          this.el?.parentElement
            ?.querySelector('input[name*="name"]')
            ?.getAttribute("value") || "";

        const autocompleteWidget = setupAlgoliaAutocomplete(
          this.el,
          pushToLiveView,
          initialState
        );

        this.handleEvent!("set-query", values => {
          // @ts-ignore
          const name = values[key]?.name || "";
          autocompleteWidget.setQuery(name);
        });
      } else {
        setupAlgoliaAutocomplete(
          this.el,
          () => {},
          () => ""
        );
      }
    }
  }
} as Partial<ViewHook>;

export default AlgoliaAutocomplete;
