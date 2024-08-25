/* eslint-disable no-param-reassign */
import { ViewHook } from "phoenix_live_view";
import setupAlgoliaAutocomplete from "../ui/autocomplete";
import {
  Item,
  LocationItem,
  PopularItem,
  StopItem
} from "../ui/autocomplete/__autocomplete";
import { Stop } from "../__v3api";

function valueFromData(data: Partial<Item>, fieldName: string): string {
  switch (fieldName) {
    case "stop_id":
      return (data as StopItem).stop?.id || (data as PopularItem).stop_id || "";
    case "name":
      return (
        (data as StopItem).stop?.name ||
        (data as LocationItem).address ||
        (data as PopularItem).name ||
        ""
      );
    default:
      return (
        ((data as StopItem).stop?.[fieldName as keyof Stop] as string) ||
        ((data as Item)[fieldName as keyof Item] as string) ||
        ""
      );
  }
}

function fieldNameFromInput(inputEl: HTMLInputElement): string | undefined {
  return inputEl.name.match(/((name|latitude|longitude|stop_id)+)/g)?.at(-1);
}
const AlgoliaAutocomplete: Partial<ViewHook> = {
  mounted() {
    const hook = (this as unknown) as ViewHook;

    if (hook.el) {
      const locationInputs =
        hook.el.parentElement?.querySelectorAll<HTMLInputElement>(
          "input.location-input"
        ) || ([] as HTMLInputElement[]);

      const pushToLiveView = (data: Partial<Item>): void => {
        if (hook.el.querySelector("[data-config='trip-planner']")) {
          locationInputs.forEach(inputEl => {
            const fieldName = fieldNameFromInput(inputEl);
            if (fieldName) {
              inputEl.value = valueFromData(data, fieldName);
              inputEl.dispatchEvent(new Event("change", { bubbles: true }));
            }
          });
        }
      };

      const initialState = (): string => {
        const inputValues = Object.fromEntries(
          [...locationInputs].map(inputEl => {
            const fieldName = fieldNameFromInput(inputEl);
            return [fieldName, inputEl.value];
          })
        );

        // side effect: dispatch event to LV to get initial map markers
        pushToLiveView(inputValues);
        return inputValues.name || "";
      };

      setupAlgoliaAutocomplete(hook.el, pushToLiveView, initialState);
    }
  }
};

export default AlgoliaAutocomplete;
