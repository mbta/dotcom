/* eslint-disable no-param-reassign */
import { ViewHook } from "phoenix_live_view";
import setupAlgoliaAutocomplete from "../ui/autocomplete";
import {
  Item,
  LocationItem,
  StopItem
} from "../ui/autocomplete/__autocomplete";
import { Stop } from "../__v3api";

function valueFromData(data: Partial<Item>, fieldName: string): string {
  if (fieldName === "name") {
    return (
      (data[fieldName as keyof Item] as string) ||
      (data as LocationItem).formatted ||
      (data as StopItem).stop?.name ||
      ""
    );
  }
  return (
    (data[fieldName as keyof Item] as string) ||
    ((data as StopItem).stop
      ? ((data as StopItem).stop![fieldName as keyof Stop] as string)
      : "") ||
    ""
  );
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
          hook.pushEvent("map_change", {
            id: hook.el.id,
            ...data
          });

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
        const inputValues = [...locationInputs].map(inputEl => {
          if (inputEl.value) {
            const fieldName = fieldNameFromInput(inputEl);
            return [fieldName, inputEl.value];
          }
          return [];
        });

        if (inputValues) {
          const data = Object.fromEntries(inputValues);
          pushToLiveView(data); // needed for LV to sync with input state on initial load
          return data.name || "";
        }

        return "";
      };

      setupAlgoliaAutocomplete(hook.el, pushToLiveView, initialState);
    }
  }
};

export default AlgoliaAutocomplete;
