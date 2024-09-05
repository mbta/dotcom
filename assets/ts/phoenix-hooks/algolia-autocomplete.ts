/* eslint-disable no-param-reassign */
import { ViewHook } from "phoenix_live_view";
import setupAlgoliaAutocomplete from "../ui/autocomplete";
import { Item } from "../ui/autocomplete/__autocomplete";

function valueFromData(data: Partial<Item>, fieldName: string): string {
  return (data[fieldName as keyof Item] as string) || "";
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
          // this will fail outside of a LiveView, that's fine
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
